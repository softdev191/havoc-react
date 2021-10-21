import { DocumentType } from '@typegoose/typegoose';
import { spawnSync } from 'child_process';
import { parse as controlParse } from 'debian-control';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { requireDB } from 'lib/auth/middleware/requireDB';
import {
    ImportErrorCode,
    ImportState,
    ReviewState
} from 'lib/database/artifact.constants';
import { Artifact, ArtifactModel } from 'lib/database/artifact.entity';
import { ListingModel } from 'lib/database/listing.entity';
import { PackagePermissionModel } from 'lib/database/packagePermission.entity';
import { UserModel } from 'lib/database/user.entity';
import { downloadFromStorage } from 'lib/util/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
export default nc()
    // TODO: guard cloud tasks
    .use(requireDB)
    .post<NextApiRequest, NextApiResponse>(async (req, res) => {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ result: 'missing id' });
        }

        const artifact = await ArtifactModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    importState: ImportState.PROCESSING
                },
                $inc: {
                    importAttempt: 1
                }
            }
        );

        if (!artifact) {
            res.status(500);
            res.end();
            return;
        }

        if (artifact.importState === ImportState.PROCESSING) {
            // Sometimes Cloud Tasks will send extraneous requests, which
            // is considered normal. Exit as success in this case.
            res.status(200);
            res.end();
            return;
        }

        // Actually import the artifact
        const importResult = await importArtifact(artifact).catch(
            async (err: Error) => {
                await markAsFailed(err, artifact);
                res.status(500);
                res.end();
                return;
            }
        );

        // import did not succeed
        if (!importResult) {
            res.status(500);
            res.end();
            return;
        }

        res.status(200);
        res.end();
    });

// The actual file import logic
async function importArtifact(
    artifact: DocumentType<Artifact>
): Promise<boolean> {
    const cwd = '/tmp/havoc';
    if (!existsSync(cwd)) mkdirSync(cwd);
    const debDestination = `${cwd}/package.deb`;

    if (!artifact.filepath) {
        throw new Error(`artifact has no filepath: ${artifact}`);
    }

    await downloadFromStorage(artifact.filepath, debDestination);
    const dpkg = spawnSync('dpkg-deb', ['-e', debDestination, cwd]);

    if (dpkg.stderr.length > 0) {
        const err = new Error(
            `Package control extraction failed for artifact ID:(${
                artifact._id
            }) filePath:${artifact.filepath} error:${dpkg.stderr.toString()}`
        );
        throw err;
    }

    // TODO: check control file max size
    // TODO: check control file max lines/entries

    // parse control file
    let data: string;
    try {
        data = readFileSync(`${cwd}/control`, 'utf8');
        // cleanup directory
        rmSync(cwd, { recursive: true, force: true });
    } catch (err) {
        // cleanup directory
        rmSync(cwd, { recursive: true, force: true });
        throw new Error(`Failed to open control file: ${err}`);
    }

    // const control: Record<string, string> = controlParse(data);

    // TODO: check control file required fields
    const controlMap = new Map<string, string>();
    const controlRecord: Record<string, string> = controlParse(data);
    Object.keys(controlRecord).forEach((key) => {
        controlMap.set(key, controlRecord[key]);
    });

    artifact.control = controlMap;

    // get/create listing
    const listing = await ListingModel.getExistingOrCreateNew(artifact);

    /**
     *  TODO:
     * - compare semver of artifact vs first listing.artifact,
     *    reject if artifact is older, replace existing doc if
     *    unpublished, else error
     * - all other artifact rejection checks
     */

    /**
     * ARTIFACT HAS PASSED ALL CHECKS, DO NOT REJECT PAST THIS POINT
     */

    artifact.importState = ImportState.COMPLETED;

    // add reference to listing doc
    artifact.listingID = listing._id;

    // Set the review state
    // TODO: check if package is verified
    const userIsVerified = await UserModel.userCanSkipPackageReview(
        artifact.createdBy
    );

    if (userIsVerified) {
        artifact.reviewState = ReviewState.APPROVED;
    }

    // Add artifact to listing
    listing.artifactId = artifact._id;

    await markAsCompleted(artifact);

    await listing.save();

    // Create the package permission
    const packagePermission = await PackagePermissionModel.new(
        listing.createdBy,
        listing._id
    );
    await packagePermission.save();

    return true;
}

// Mark artifact as failed to import
async function markAsFailed(err: Error, artifact?: DocumentType<Artifact>) {
    console.error(err);

    if (artifact) {
        artifact.importState = ImportState.FAILED;
        artifact.importEndedAt = new Date();

        artifact.importErrorCode = ImportErrorCode.UNKNOWN;
        artifact.importError = err.message;

        await artifact.save();
    }
}

// Mark artifact as rejected by system
// async function markAsRejected(
//     artifact: DocumentType<Artifact>,
//     code: ImportErrorCode
// ) {
//     artifact.importState = ImportState.REJECTED;
//     artifact.importEndedAt = new Date();

//     artifact.importErrorCode = code;
//     artifact.importError = `Package was rejected for a user error: ${code}`;

//     await artifact.save();
// }

// Mark artifact as completed successfully
async function markAsCompleted(artifact: DocumentType<Artifact>) {
    artifact.importState = ImportState.COMPLETED;
    artifact.importEndedAt = new Date();

    // Remove previous errors if existed
    // TODO: these set the fields to null instead of unsettng them
    artifact.importErrorCode = undefined;
    artifact.importError = undefined;

    await artifact.save();
}

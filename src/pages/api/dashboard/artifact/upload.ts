import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ImportState } from 'lib/database/artifact.constants';
import { ArtifactModel } from 'lib/database/artifact.entity';
import createImportTask from 'lib/import/createtask';
import { StorageUploadPipe } from 'lib/util/storagepipe';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

// required, tells Next to not parse request body
export const config = {
    api: {
        bodyParser: false
    }
};

export default nc()
    .use(requireDB)
    .use(requireSession)
    .post<WithCustomSession, NextApiResponse>(async (req, res) => {
        if (!req.session) {
            return res.status(401).json({ result: errorMessages._401 });
        }

        const user = req.session.user;
        const userID = user.id;

        if (!userCanUploadNewArtifact(userID)) {
            return res.status(401).json({ result: 'limited' });
        }

        const artifact = await ArtifactModel.new(user.id);

        await artifact.save();

        const storagePipe = new StorageUploadPipe({ headers: req.headers });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        storagePipe.on('file', async (_fieldname, filename, _mimetype) => {
            artifact.filename = filename;
            const cloudStoragePath = `artifacts/${userID}/${artifact.id}/${filename}`;
            artifact.filepath = cloudStoragePath;
            artifact.importState = ImportState.UPLOADING;
            await artifact.save();

            return cloudStoragePath;
        });

        storagePipe.on('error', async (err: Error) => {
            console.error('upload error', err);

            artifact.importState = ImportState.UPLOADCANCELLED;

            // I don't particularly approve of using this field to hold
            // the error but idk under what circumstance this path will
            // run
            artifact.importError = err.message;
            await artifact.save();

            res.status(500).json({
                result: 'failed for unknown reason'
            });
            res.end();
        });

        storagePipe.on('finish', async () => {
            artifact.uploadedAt = new Date();
            artifact.importState = ImportState.QUEUED;
            await artifact.save();

            // Add artifact to import queue
            const taskRes = await createImportTask(artifact);
            if (!taskRes) {
                res.status(500).json({
                    result: 'failed for unknown reason'
                });
                res.end();
            }

            res.status(200).json({ result: 'success', id: artifact.id });
            res.end();
        });

        storagePipe.begin(req);
    });

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function userCanUploadNewArtifact(_userID: string): Promise<boolean> {
    return true;
}

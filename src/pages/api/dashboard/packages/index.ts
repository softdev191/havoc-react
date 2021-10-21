import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ImportState } from 'lib/database/artifact.constants';
import { ArtifactModel } from 'lib/database/artifact.entity';
import { ListingModel } from 'lib/database/listing.entity';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

export default nc()
    .use(requireDB)
    .use(requireSession)

    .get<WithCustomSession, NextApiResponse>(async (req, res) => {
        // Validate session
        if (!req.session) {
            return res.status(401).json({ result: errorMessages._401 });
        }

        const user = req.session.user;

        const pendingArtifacts = await ArtifactModel.aggregate([
            {
                $match: {
                    createdBy: user.id,
                    $or: [
                        { importState: ImportState.QUEUED },
                        { importState: ImportState.PROCESSING }
                    ]
                }
            },
            {
                $count: 'pending'
            }
        ]);

        const out: Record<string, unknown> = {};

        if (pendingArtifacts.length > 0) {
            const first = pendingArtifacts[0];
            if (first.pending && first.pending > 0) {
                out.pending = first.pending;
            }
        }

        const listings = await ListingModel.aggregate([
            {
                $match: {
                    createdBy: {
                        $in: [user.id]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    displayName: 1,
                    version: 1,
                    icon: 1,
                    status: 1,
                    price: 1,
                    packageID: 1
                }
            }
        ]);

        out.packages = listings;

        return res.status(200).json(out);
    });

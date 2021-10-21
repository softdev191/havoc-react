import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ArtifactModel } from 'lib/database/artifact.entity';
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

        // Validate ID
        const artifactID = req.query['id'] as string;
        if (!artifactID || artifactID.length < 1) {
            return res.status(400).json({ result: 'missing id' });
        }

        // TODO: check if user has access to artifact

        const artifact = await ArtifactModel.findOne({
            _id: artifactID
        });

        // Validate artifact
        if (!artifact) {
            return res.status(400).json({ result: 'artifact does not exist' });
        }

        const user = req.session.user;

        // Validate artifact ownership
        if (artifact.createdBy !== user.id) {
            // Artifact does not belong to requester
            return res.status(401).json({ result: errorMessages._401 });
        }

        return res.status(200).json({ status: artifact.importState });
    });

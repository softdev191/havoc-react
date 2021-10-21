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
        /*
            TODO: check if user has existing pending id
            other rate limiting
        */
        if (!req.session) {
            return res.status(401).json({ error: errorMessages._401 });
        }

        const user = req.session.user;

        const artifact = await ArtifactModel.new(user.id);
        console.debug(artifact);
        await artifact.save();

        return res.status(200).json({ result: 'success', id: artifact.id });
    });

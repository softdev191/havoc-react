import { Storage } from '@google-cloud/storage';
import { requireDB } from 'lib/auth/middleware/requireDB';
import { ScreenshotModel } from 'lib/database/screenshot.entity';
import env from 'lib/env';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export default nc()
    .use(requireDB)
    .get<NextApiRequest, NextApiResponse>(async (req, res) => {
        // Validate ID
        const screenshotID = req.query['id'] as string;
        if (!screenshotID || screenshotID.length < 1) {
            return res.status(400).json({ result: 'missing id' });
        }

        const screenshot = await ScreenshotModel.findOne({
            _id: screenshotID,
            uploaded: true
        });

        if (!screenshot) {
            return res
                .status(400)
                .json({ result: 'screenshot does not exist' });
        }

        const storage = new Storage();
        const bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);
        const gcsFile = bucket.file(screenshot.filepath);

        const stream = gcsFile.createReadStream();
        stream.on('end', () => {
            res.end();
        });
        stream.pipe(res);
    });

import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ScreenshotModel } from 'lib/database/screenshot.entity';
import { UserModel } from 'lib/database/user.entity';
import { StorageUploadPipe } from 'lib/util/storagepipe';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

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
            return res.status(401).json({ error: errorMessages._401 });
        }

        const user = req.session.user;

        const listingID = req.query['id'] as string;
        if (!listingID) {
            return res.status(400).json({ error: errorMessages._400 });
        }

        if (!(await UserModel.userHasAccessToEditListing(user.id, listingID))) {
            return res.status(401).json({ error: errorMessages._401 });
        }

        const screenshot = await ScreenshotModel.new(user.id, listingID);

        const uploadPipe = new StorageUploadPipe({ headers: req.headers });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        uploadPipe.on('file', async (_fieldname, filename, _mimetype) => {
            const uploadPath = `screenshots/${user.id}/${screenshot.id}/${filename}`;
            screenshot.filepath = uploadPath;
            await screenshot.save();
            return uploadPath;
        });

        uploadPipe.on('error', async (err: Error) => {
            console.error('screenshot upload error', err);

            await screenshot.save();

            res.status(500).json({
                result: 'failed for unknown reason'
            });
            res.end();
        });

        uploadPipe.on('finish', async () => {
            screenshot.uploaded = true;
            await screenshot.save();

            res.status(200).json({
                result: 'success',
                id: screenshot._id
            });
            res.end();
        });

        uploadPipe.begin(req);
    });

import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

// I guess this might not be needed since user is stored in the session anyways,
// just wanted to test a route that wasn't going to be admin or seller restricted
// Actually on second thought I think there will be some data not in the session
// like purchases, etc. so we may call to the database here or in a purchases route
export default nc()
    .use(requireSession)
    .get((req: WithCustomSession, res: NextApiResponse) => {
        return res.status(200).json(req.session?.user);
    });

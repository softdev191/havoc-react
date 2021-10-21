import { mongoose } from '@typegoose/typegoose';
import { requireDB } from 'lib/auth/middleware/requireDB';
import requirePermission from 'lib/auth/middleware/requirePermission';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { UserModel } from 'lib/database/user.entity';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

const Users = nc()
    .use(requireDB)
    .use(requireSession)
    .use(requirePermission('admin'))
    .get(async (req: WithCustomSession, res: NextApiResponse) => {
        const { id } = req.query;

        if (typeof id !== 'string') {
            return res.status(400);
        }

        try {
            const user = await UserModel.findOne({
                id: new mongoose.Types.ObjectId(id)
            });

            if (!user) {
                return res.status(404).json({
                    error: 'No users found'
                });
            }

            return res.json({ user: user });
        } catch (error) {
            console.error(`Error getting user with id: [${id}]:`, error);

            return res.status(500).json({ error: errorMessages._500 });
        }
    });

export default Users;

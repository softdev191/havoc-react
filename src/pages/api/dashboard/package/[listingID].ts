import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ListingModel } from 'lib/database/listing.entity';
import { UserModel } from 'lib/database/user.entity';
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
        const listingID = req.query.listingID as string;

        if (!(await UserModel.userHasAccessToEditListing(user.id, listingID))) {
            return res.status(401).json({ result: errorMessages._401 });
        }

        const listing = await ListingModel.aggregate([
            {
                $match: {
                    _id: listingID
                }
            },
            {
                $lookup: {
                    from: 'artifacts',
                    localField: 'artifactId',
                    foreignField: '_id',
                    as: 'artifacts'
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    displayName: 1,
                    packageID: 1,
                    published: 1,
                    screenshots: 1,
                    description: 1,
                    artifacts: 1,
                    hiddenBy: {
                        $cond: {
                            if: { $eq: ['$hiddenBy', false] },
                            then: '$$REMOVE',
                            else: '$hiddenBy'
                        }
                    }
                }
            }
        ]);

        if (!listing || listing.length < 1) {
            return res.status(401).json({ result: errorMessages._401 });
        }

        if (!listing) {
            return res.status(401).json({ result: errorMessages._401 });
        }
        return res.status(200).json(listing[0]);
    });

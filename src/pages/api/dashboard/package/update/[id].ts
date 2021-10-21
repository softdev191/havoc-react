import { requireDB } from 'lib/auth/middleware/requireDB';
import requireSession, {
    WithCustomSession
} from 'lib/auth/middleware/requireSession';
import { errorMessages } from 'lib/constants';
import { ListingModel } from 'lib/database/listing.entity';
import { ScreenshotModel } from 'lib/database/screenshot.entity';
import { UserModel } from 'lib/database/user.entity';
import { PackageSaveRequest } from 'lib/types/SaveRequest';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

interface ValidationResult {
    code: number;
    error?: string;
}

export default nc()
    .use(requireDB)
    .use(requireSession)

    .post<WithCustomSession, NextApiResponse>(async (req, res) => {
        if (!req.session) {
            return res.status(401).json({ error: errorMessages._401 });
        }

        // validate data
        const data = req.body as PackageSaveRequest;

        if (!data) {
            return res.status(400).json({ error: errorMessages._400 });
        }

        const { id } = req.query;
        const listingID = id as string;

        const user = req.session.user;

        if (!(await UserModel.userHasAccessToEditListing(user.id, listingID))) {
            return res.status(401).json({ error: errorMessages._401 });
        }

        const listing = await ListingModel.findOne({
            _id: listingID
        });

        if (!listing) {
            return res.status(400).json({ error: errorMessages._400 });
        }

        // Save listing name
        if (data.name) {
            listing.displayName = data.name;
        }

        // Save listing description
        if (data.description) {
            listing.description = data.description;
        }

        // Save screenshots
        const screenshotIDs = data.screenshots;
        if (screenshotIDs) {
            const valRes = await validateScreenshotInput(
                screenshotIDs,
                listingID
            );

            if (valRes.error) {
                return res.status(valRes.code).json({ error: valRes.error });
            }

            listing.screenshots = screenshotIDs;
        }

        // Save listing
        console.debug(listing);
        await listing.save();

        return res.status(200).json({ result: 'OK' });
    });

/**
 *  Saves `screenshots` to the `listingID`
 * @param screenshots A list of screenshot IDs to save
 * @param listingID The listingID to save the `screenshots` to
 * @param listingRepository The listing repository
 * @param screenshotRepository The screenshot repository
 * @returns The HTTP status code, and the error, if any
 */
async function validateScreenshotInput(
    screenshots: string[],
    listingID: string
): Promise<ValidationResult> {
    screenshots.forEach((screenshotID) => {
        if (!screenshotBelongsToListing(screenshotID, listingID)) {
            return { code: 401, error: errorMessages._401 };
        }
    });

    return { code: 200 };
}

// checks if screenshot was uploaded for listingID
async function screenshotBelongsToListing(
    screenshotID: string,
    listingID: string
): Promise<boolean> {
    const res = await ScreenshotModel.count({
        _id: screenshotID,
        listingID: listingID
    });

    return res > 0;
}

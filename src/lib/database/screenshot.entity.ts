import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { HashModel } from './hash.entity';

export class Screenshot {
    @prop({ alias: 'id', type: String, required: true, immutable: true })
    _id!: string;

    id!: string;

    /**
     * ID of the user who created this screenshot
     */
    @prop({ type: String })
    createdBy!: string;

    /**
     * When the screenshot was created
     */
    @prop({ type: Date, required: true, immutable: true })
    createdAt!: Date;

    /**
     * Listing ID this screenshot belongs to
     */
    @prop({ type: String, required: true, immutable: true })
    listingID!: string;

    /**
     * Path to the Screenshot in Cloud Storage
     */
    @prop({ type: String, required: true, immutable: true })
    filepath!: string;

    /**
     * If the Screenshot was successfully uploaded
     */
    @prop({ type: Boolean, required: true, default: false })
    uploaded!: boolean;

    /**
     *
     * @param userID The screenshot owner's user ID
     * @returns newly created doc
     */
    public static async new(
        this: ReturnModelType<typeof Screenshot>,
        userID: string,
        listingID: string
    ) {
        const id = await HashModel.newScreenshotID();
        const screenshot = new ScreenshotModel();
        screenshot.id = id;
        screenshot.listingID = listingID;
        screenshot.createdBy = userID;
        return screenshot;
    }
}

export const ScreenshotModel = getModelForClass(Screenshot);

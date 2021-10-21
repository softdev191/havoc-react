import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { HashModel } from './hash.entity';

export class PackagePermission {
    @prop({ alias: 'id', type: String, required: true, immutable: true })
    _id!: string;

    id!: string;

    /**
     * ID of the user who has this permission
     */
    @prop({ type: String, required: true, immutable: true })
    createdBy!: string;

    /**
     * Listing ID this permission belongs to
     */
    @prop({ type: String, required: true, immutable: true })
    listingID!: string;

    /**
     * Permission level
     */
    @prop({ type: String, required: true, default: 'owner' })
    level!: string;

    /**
     *
     * @param userID The permission owner's user ID
     * @returns newly created doc
     */
    public static async new(
        this: ReturnModelType<typeof PackagePermission>,
        userID: string,
        listingID: string
    ) {
        const id = await HashModel.newPackagePermissionID();
        const permission = new PackagePermissionModel();
        permission.id = id;
        permission.listingID = listingID;
        permission.createdBy = userID;
        return permission;
    }
}

export const PackagePermissionModel = getModelForClass(PackagePermission);

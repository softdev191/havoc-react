import {
    getModelForClass,
    mongoose,
    prop,
    ReturnModelType
} from '@typegoose/typegoose';

import { ListingModel } from './listing.entity';
import { UserPermissions } from './user.constants';

export class User {
    @prop({
        alias: 'id',
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true
    })
    _id!: mongoose.Types.ObjectId;

    id!: mongoose.Types.ObjectId;

    @prop({ type: String })
    name?: string;

    @prop({ type: String })
    email?: string;

    @prop({ type: String })
    image?: string;

    @prop({ type: Date })
    emailVerified?: Date;

    @prop({ type: Date, required: true })
    createdAt!: Date;

    @prop({ type: Date, required: true })
    updatedAt!: Date;

    @prop({ type: String, enum: UserPermissions })
    permissions?: UserPermissions[];

    // public static async findBySpecies(this: ReturnModelType<typeof User>) {
    //     return this.find({ species }).exec();
    //   }

    /**
     *
     * @param userID The ID of the user to check `permission` for
     * @param permission The permission to check the user for
     * @returns `true` If the user has permission
     */
    public static async userHasPermission(
        this: ReturnModelType<typeof User>,
        userID: mongoose.Types.ObjectId | string,
        permission: UserPermissions
    ): Promise<boolean> {
        const user = await this.findOne({
            id: new mongoose.Types.ObjectId(userID)
        });

        if (!user || !user.permissions || user.permissions.length < 1) {
            return false;
        }

        return user.permissions.includes(permission);
    }

    /**
     *
     * @param userID The ID of the user to query
     * @returns `true` If the user can skip package review
     */
    public static async userCanSkipPackageReview(
        this: ReturnModelType<typeof User>,
        userID: mongoose.Types.ObjectId | string
    ): Promise<boolean> {
        return this.userHasPermission(
            userID,
            UserPermissions.SKIP_PACKAGE_REVIEW
        );
    }

    /**
     *
     * @param userID The ID of the user to query
     * @returns `true` If the user is an admin
     */
    public static async userIsAdmin(
        this: ReturnModelType<typeof User>,
        userID: mongoose.Types.ObjectId | string
    ): Promise<boolean> {
        return this.userHasPermission(userID, UserPermissions.ADMIN);
    }

    /**
     *
     * @param userID The ID of the user to query
     * @returns `true` If the user is a seller
     */
    public static async userIsSeller(
        this: ReturnModelType<typeof User>,
        userID: mongoose.Types.ObjectId | string
    ): Promise<boolean> {
        return this.userHasPermission(userID, UserPermissions.SELLER);
    }

    /**
     *
     * @param userID The ID of the user to query
     * @param listingID The ID of the listing to check access for
     * @returns `true` If the user has access to edit the listing
     */
    public static async userHasAccessToEditListing(
        this: ReturnModelType<typeof User>,
        userID: string,
        listingID: string
    ): Promise<boolean> {
        if (this.userIsAdmin(userID)) {
            return true;
        }

        const count = await ListingModel.count({
            _id: listingID,
            owners: {
                $in: [userID.toString()]
            }
        });

        return count === 1;
    }
}

export const UserModel = getModelForClass(User);

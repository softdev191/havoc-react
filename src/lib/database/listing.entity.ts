import {
    DocumentType,
    getModelForClass,
    prop,
    ReturnModelType
} from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { ControlFields } from 'lib/constants';

import { Artifact } from './artifact.entity';
import { HashModel } from './hash.entity';

export class Listing {
    @prop({ alias: 'id', type: String, required: true, immutable: true })
    _id!: string;

    id!: string;

    /**
     * Value of the `Package` field in the `control` file
     */
    @prop({ type: String, required: true, immutable: true })
    packageID!: string;

    /**
     * ID of the user who created this listing
     */
    @prop({ type: String, required: true, immutable: true })
    createdBy!: string;

    /**
     * When the listing was created
     */
    @prop({
        type: Date,
        required: true,
        immutable: true,
        default: () => {
            return new Date();
        }
    })
    createdAt!: Date;

    /**
     * Name of the listing that is publicly displayed and
     * replaces the `control`'s `Name` field in the `Packages` file
     */
    @prop({ type: String, required: true })
    displayName!: string;

    /**
     * Description entered in by the user
     */
    @prop({ type: String, default: '' })
    description!: string;

    /**
     * Package version
     */
    @prop({ type: String, default: '' })
    version!: string;

    /**
     * Package icon image
     */
    @prop({ type: String, default: '' })
    icon!: string;

    /**
     * Package status has these values: "approved" | "pending" | "review" | "rejected"
     */
    @prop({ type: String, default: '' })
    status!: string;

    /**
     * Package price
     */
    @prop({ type: Number, default: '' })
    price!: number;

    /**
     * `Screenshot` IDs
     */
    @prop({ type: String, default: [] }, WhatIsIt.ARRAY)
    screenshots?: string[];

    /**
     * Nonconclusive list of recent `Artifact`s used
     * for generating the `Packages` file
     */
    @prop({ type: String, required: true })
    artifactId?: string;

    /**
     * Listing is hidden by a user
     */
    @prop({ type: Boolean, required: true, default: false })
    hidden!: boolean;

    /**
     * Listing is hidden by a user
     */
    @prop({ type: String })
    hiddenBy!: string;

    /**
     * Listing is hidden by an admin
     */
    @prop({ type: Boolean, required: true, default: false })
    hiddenByAdmin!: boolean;

    /**
     * Listing is published
     */
    @prop({ type: Boolean, required: true, default: false })
    published!: boolean;

    /**
     *
     * @param artifact The artifact to create the listing from
     * @returns The newly, unsaved, created listing
     */
    static async getExistingOrCreateNew(
        this: ReturnModelType<typeof Listing>,
        artifact: Artifact
    ): Promise<DocumentType<Listing>> {
        const packageID = artifact.control?.get(ControlFields.Package);
        if (!packageID) {
            throw 'Missing Package ID';
        }

        const existing = await this.findOne({
            // existing package id
            packageID: packageID
        });

        if (existing) return existing;

        return this.createFromArtifact(artifact);
    }

    /**
     *
     * @param artifact The artifact to create the listing from
     * @returns The newly, unsaved, created listing
     */
    static async createFromArtifact(
        this: ReturnModelType<typeof Listing>,
        artifact: Artifact
    ): Promise<DocumentType<Listing>> {
        if (!artifact) {
            throw `artifact === null`;
        }
        if (!artifact.control) {
            throw `artifact has no control`;
        }

        const listing = new ListingModel();

        const id = await HashModel.newListingID();

        listing.id = id;
        listing.createdBy = artifact.createdBy;

        const packageID = artifact.control.get('Package');
        if (!packageID) {
            console.error(
                `Package [${id}] is missing Package field in control`,
                artifact
            );
            throw 'control is missing Package field';
        }
        listing.packageID = packageID;

        const displayName = artifact.control.get('Name');
        if (!displayName) {
            console.error(
                `Package [${id}] is missing Name field in control`,
                artifact
            );
            throw 'control is missing Name field';
        }
        listing.displayName = displayName;

        return listing;
    }
}

export const ListingModel = getModelForClass(Listing);

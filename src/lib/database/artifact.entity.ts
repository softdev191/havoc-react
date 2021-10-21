import {
    getModelForClass,
    prop,
    queryMethod,
    ReturnModelType
} from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';

import {
    ImportErrorCode,
    ImportState,
    ReviewState
} from './artifact.constants';
import { HashModel } from './hash.entity';

// an interface is needed to add query-function types to the class
interface QueryHelpers {
    // use the actual function types dynamically
    findByName: AsQueryMethod<typeof findByCreator>;
}

function findByCreator(
    this: ReturnModelType<typeof Artifact, QueryHelpers>,
    createdBy: string
) {
    return this.findOne({ createdBy }); // important to not do an "await" and ".exec"
}

@queryMethod(findByCreator)
export class Artifact {
    @prop({ alias: 'id', type: String, required: true, immutable: true })
    _id!: string;

    id!: string;

    /**
     * ID of the user who created the Artifact
     */
    @prop({ type: String, required: true, immutable: true })
    public createdBy!: string;

    /**
     * When the document was created at
     */
    @prop({
        type: Date,
        required: true,
        immutable: true,
        default: () => {
            return new Date();
        }
    })
    public createdAt!: Date;

    /**
     * State of the Artifact import
     */
    @prop({
        type: String,
        enum: ImportState,
        required: true,
        default: ImportState.CREATED
    })
    public importState!: ImportState;

    /**
     * Number of times an import has been attempted
     */
    @prop({ type: Number, required: true, default: 0 })
    public importAttempt!: number;

    /**
     * An Artifact's publish state dictates if the Artifact has ever
     * been publicly visible/published. Once an Artifact
     * has been published it cannot ever be unpublished.
     */
    @prop({ type: Boolean, required: true, default: false })
    published!: boolean;

    /**
     * Admin review state
     */
    @prop({
        type: String,
        enum: ReviewState,
        required: true,
        default: ReviewState.NOTSUBMITTED
    })
    public reviewState!: ReviewState;

    /**
     * If the Artifact was hidden by the artifact owner
     */
    @prop({ type: Boolean, required: true, default: false })
    public hiddenByOwner!: boolean;

    /**
     * If the Artifact was hidden by a platform admin
     */
    @prop({ type: Boolean, required: true, default: false })
    hiddenByAdmin!: boolean;

    /**
     * When the Artifact was published
     */
    @prop({ type: Date })
    publishedAt?: Date;

    /**
     * When the Artifact's file upload was
     * successfully completed by the user
     */
    @prop({ type: Date })
    uploadedAt?: Date;

    /**
     * When the Artifact began the import
     * process
     */
    @prop({ type: Date })
    importStartedAt?: Date;

    /**
     * When the Artifact last finished importing,
     * regardless of error
     */
    @prop({ type: Date })
    importEndedAt?: Date;

    /**
     * The name of the file that was uploaded
     */
    @prop({ type: String })
    filename?: string;

    /**
     * Path to the Artifact in Cloud Storage
     */
    @prop({ type: String })
    filepath?: string;

    /**
     * The error code associated with the import result,
     * to be localized for users to read
     */
    @prop({ type: String, enum: ImportErrorCode })
    importErrorCode?: ImportErrorCode;

    /**
     * The private upload error only to be seen by admins
     */
    @prop({ type: String })
    importError?: string;

    /**
     * Listing ID associated with the Artifact
     */
    @prop({ type: String })
    listingID?: string;

    /**
     * The `control` file from the Artifact
     */
    @prop({ type: String }, WhatIsIt.MAP)
    public control?: Map<string, string>;

    /**
     *
     * @param userID The artifact owner's user ID
     * @returns newly created doc
     */
    public static async new(
        this: ReturnModelType<typeof Artifact>,
        userID: string
    ) {
        const id = await HashModel.newArtifactID();
        const artifact = new ArtifactModel();
        artifact.id = id;
        artifact.createdBy = userID;
        return artifact;
    }
}

export const ArtifactModel = getModelForClass<typeof Artifact, QueryHelpers>(
    Artifact
);

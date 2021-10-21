import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { HashSalt, HashType } from './hash.constants';

// I have no idea why the hell this cannot be imported
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids = require('hashids');

export class Hash {
    @prop({ alias: 'id', type: String, required: true, immutable: true })
    _id!: string;

    id!: string;

    /**
     * A sequentially incrementing number used to uniquely
     * calculate hash IDs
     */
    @prop({ type: Number, required: true, default: 0 })
    index!: number;

    /**
     *
     * @returns A new Artifact ID
     */
    public static async newArtifactID(this: ReturnModelType<typeof Hash>) {
        return await Hash.newHashID(HashType.ARTIFACT);
    }

    /**
     *
     * @returns A new Listing ID
     */
    public static async newListingID(this: ReturnModelType<typeof Hash>) {
        return await Hash.newHashID(HashType.LISTING);
    }

    /**
     *
     * @returns A new PackagePermission ID
     */
    public static async newPackagePermissionID(
        this: ReturnModelType<typeof Hash>
    ) {
        return await Hash.newHashID(HashType.PACKAGEPERMISSION);
    }

    /**
     *
     * @returns A new Screenshot ID
     */
    public static async newScreenshotID(this: ReturnModelType<typeof Hash>) {
        return await Hash.newHashID(HashType.SCREENSHOT);
    }

    private static async newUUID(type: HashType) {
        const res = await HashModel.findOneAndUpdate(
            { _id: type },
            {
                $inc: { index: 1 }
            },
            { upsert: true, new: true }
        );

        if (!res) {
            throw `no document found for hash type ${type}. This really shouldn't happen`;
        }

        return res.index;
    }

    private static makeHash(uuid: number, salt: string): string {
        const hashid = new Hashids(salt, 4);
        return hashid.encode(uuid);
    }

    private static async newHashID(type: HashType): Promise<string> {
        const uuid = await this.newUUID(type);
        if (isNaN(uuid)) {
            throw `failed to get valid uuid, received: ${uuid}`;
        }

        const salt = HashSalt(type);

        return this.makeHash(uuid, salt);
    }
}

export const HashModel = getModelForClass(Hash);

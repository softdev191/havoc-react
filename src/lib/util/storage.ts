import { Storage } from '@google-cloud/storage';
import env from 'lib/env';

/**
 *
 * @param remotePath The path to the file in Cloud Storage
 * @param localPath The path to download the file to locally
 * @returns nothing
 */
export async function downloadFromStorage(
    remotePath: string,
    localPath: string
) {
    const storage = new Storage();

    const options = {
        destination: localPath
    };

    // Downloads the file
    return storage
        .bucket(env.GCLOUD_STORAGE_BUCKET)
        .file(remotePath)
        .download(options);
}

import { Storage } from '@google-cloud/storage';
import Busboy from 'busboy';
import env from 'lib/env';
import stream from 'stream';

type Handler = InitHandler | ErrorHandler | CompletionHandler;

type InitHandler = (
    fieldname: string,
    filename: string,
    mimetype: string
) => Promise<string> | undefined;
type ErrorHandler = (error: Error) => Promise<void>;
type CompletionHandler = () => Promise<void>;

export interface StorageUploadPipe {
    on(event: 'file', handler: InitHandler): void;
    on(event: 'error', handler: ErrorHandler): void;
    on(event: 'finish', handler: CompletionHandler): void;
}

export class StorageUploadPipe {
    private bus!: busboy.Busboy;
    private storage: Storage;
    private listeners: Map<string, Handler>;

    constructor(config: busboy.BusboyConfig) {
        this.bus = new Busboy(config);
        this.storage = new Storage();
        this.listeners = new Map();

        this.bus.on(
            'file',
            async (fieldname, file, filename, _encoding, mimetype) => {
                const fileHandler = this.listeners.get('file') as
                    | InitHandler
                    | undefined;
                if (!fileHandler) {
                    throw 'no listener for file';
                }

                const cloudFilePath = await fileHandler(
                    fieldname,
                    filename,
                    mimetype
                );
                if (!cloudFilePath) return;

                const bucket = this.storage.bucket(env.GCLOUD_STORAGE_BUCKET);
                const gcsFile = bucket.file(cloudFilePath);
                const stream = gcsFile.createWriteStream({
                    resumable: false
                });

                stream.on('error', async (err) => {
                    const errHandler = this.listeners.get('error') as
                        | ErrorHandler
                        | undefined;
                    if (!errHandler) return;

                    await errHandler(err);
                });

                stream.on('finish', async () => {
                    const completion = this.listeners.get('finish') as
                        | CompletionHandler
                        | undefined;
                    if (!completion) return;

                    await completion();
                });

                file.on('data', (data: Buffer) => {
                    stream.write(data);
                });

                file.on('end', () => {
                    stream.end();
                });
            }
        );
    }

    on(event: string, handler: Handler) {
        this.listeners.set(event, handler);
    }

    begin(req: stream.Readable) {
        req.pipe(this.bus);
    }
}

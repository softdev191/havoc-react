class env {
    // any new env vars should be added and accessed through here
    PROJECT_ID!: string;
    IMPORT_QUEUE!: string;
    IMPORT_QUEUE_LOCATION!: string;
    DISCORD_CLIENT_ID!: string;
    DISCORD_CLIENT_SECRET!: string;
    MONGODB_URI!: string;
    MONGODB_DB!: string;
    GCLOUD_STORAGE_BUCKET!: string;
    NEXTAUTH_URL!: string;

    constructor() {
        Object.getOwnPropertyNames(this).forEach((key) => {
            const ts_sucks: Record<string, string> = {};
            const val = process.env[key];
            if (!val) {
                const err = new Error(
                    `PROCESS IS MISSING ENVIRONMENT VARIABLE:${key}`
                );
                console.error(err);
                throw err;
            }
            ts_sucks[key] = val;

            Object.assign(this, ts_sucks);
        });
    }
}
export default new env();

import env from 'lib/env';
import mongoose, { ConnectionOptions, Mongoose } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export async function closeDbConnection() {
    try {
        await mongoose.connection.close();
    } catch (err) {
        // Catch locally error
        console.error('Could not close mongoose connection');
        console.error(err);
    }
}

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/util/mongodb.js
// We need to globally cache Mongoose connection promise so that it's reused by all calls to connectToDb
// => this avoid unexpectedly creating multiple connections + the promise is shared so .then/.catch are called as expected
interface MongooseCache {
    connectPromise: Promise<Mongoose> | null;
}
interface GlobalWithMongoose extends NodeJS.Global {
    mongooseCache: MongooseCache | undefined;
}
const globalNode: GlobalWithMongoose = {
    mongooseCache: undefined,
    ...global
};
let mongooseCache = globalNode.mongooseCache; // shared promise, so "then" chains are called correctly for all code trying to connect (avoids race conditions)
if (!mongooseCache) {
    globalNode.mongooseCache = { connectPromise: null };
    mongooseCache = globalNode.mongooseCache;
}
export const connectToDb = async (
    mongoUri: string,
    options?: ConnectionOptions
) => {
    if (mongooseCache?.connectPromise) {
        await mongooseCache.connectPromise;
    }
    if (![1, 2].includes(mongoose.connection.readyState)) {
        (mongooseCache as MongooseCache).connectPromise = mongoose.connect(
            mongoUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                ...(options || {})
            }
        );
        // Wait for connection
        await mongooseCache?.connectPromise;
    }
};

const DB_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
};

export async function requireDB(
    _req: NextApiRequest,
    _res: NextApiResponse,
    next: NextHandler
) {
    await connectToDb(env.MONGODB_URI, DB_OPTIONS);

    return next();
}

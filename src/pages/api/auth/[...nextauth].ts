import { CustomUser } from 'lib/auth/middleware/requireSession';
import env from 'lib/env';
import NextAuth, { CallbacksOptions, Session } from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

const callbacks: CallbacksOptions = {
    /*
        Typescript is a little fucky wucky here. I think once CallbacksOptions
        properly utilizes the TUser and TSession generics that things will
        get cleaned up. For now just dealing with it/ignoring the errors.

        Luckily some legend just did this for the events:
            https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52150
            https://github.com/DefinitelyTyped/DefinitelyTyped/pull/52152
        So hopefully someone does the callbacks soonTM (:
    */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    session: async (session: Session, user: CustomUser) => {
        return Promise.resolve({
            ...session,
            user: {
                id: user.id,
                permissions: user.permissions,
                ...session.user
            }
        });
    }
};

export default NextAuth({
    providers: [
        Providers.Discord({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET
        })
    ],
    callbacks: callbacks,

    adapter: Adapters.TypeORM.Adapter({
        type: 'mongodb',
        url: env.MONGODB_URI,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
});

import { errorMessages } from 'lib/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from 'next-auth';
import { getSession } from 'next-auth/client';
import { NextHandler } from 'next-connect';

/*
    Session Middleware

    An API middleware you can use to require the request
    contains a valid session before accessing your API route

    Example: api/user.ts
*/

export interface CustomUser extends User {
    id: string;
    permissions?: string[];
}

interface CustomSession extends Omit<Session, 'user'> {
    user: CustomUser;
}

export interface WithCustomSession extends NextApiRequest {
    session: CustomSession | null;
}

const requireSession = async (
    req: WithCustomSession,
    res: NextApiResponse,
    next: NextHandler
) => {
    const session = ((await getSession({ req })) as unknown) as CustomSession;
    req.session = session;

    if (!req.session) {
        return res.status(401).json({ error: errorMessages._401 });
    }

    return next();
};

export default requireSession;

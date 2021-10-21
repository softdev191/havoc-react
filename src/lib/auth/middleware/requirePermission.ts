import { errorMessages } from 'lib/constants';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { WithCustomSession } from './requireSession';

/*
    Permission Middleware

    An API middleware you can use to require the user
    has a specific permission to access your API route.

    Example: api/dashboard/admin/users/[id].ts
*/
const requirePermission = (permission: string) => async (
    req: WithCustomSession,
    res: NextApiResponse,
    next: NextHandler
) => {
    // Shouldn't be possible unless requireSession chain is forgotten
    if (!req.session) {
        return res.status(401).json({ error: errorMessages._401 });
    }

    console.log(`[requirePermission] Route requires permission: ${permission}`);
    console.log('[requirePermission] User:', req.session?.user);
    const permissions = req.session?.user.permissions as string[];

    if (!permissions.includes(permission)) {
        console.log('[requirePermission] User lacks required permission');
        return res.status(403).json({ error: errorMessages._403 });
    }
    console.log('[requirePermission] User is authorized');

    return next();
};

export default requirePermission;

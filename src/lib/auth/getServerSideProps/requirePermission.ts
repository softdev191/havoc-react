import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';

const requirePermission = (permission: string) => async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        };
    }

    const permissions = session?.user.permissions as string[];

    if (!permissions.includes(permission)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return { props: { session } };
};

export default requirePermission;

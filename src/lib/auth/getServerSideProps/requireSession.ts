import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';

const requireSession = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        };
    }

    return { props: { session } };
};

export default requireSession;

import { signIn, signOut, useSession } from 'next-auth/client';
import { createContext, ReactNode, useContext } from 'react';

export { signIn, signOut };

export interface UserSession {
    signedIn: boolean;
    loading: boolean;
    name: string;
    email: string;
    image: string;
}

const SessionContext = createContext<UserSession>({
    signedIn: false,
    loading: true,
    name: 'No name provided',
    email: 'No email provided',
    image: ''
});

const SessionProvider = (props: { children: ReactNode }) => {
    const [session, loading] = useSession();

    const value: UserSession = {
        signedIn: !!session,
        loading: loading,
        name: session?.user.name || 'No name provided',
        email: session?.user.email || 'No email provided',
        image: session?.user.image || ''
    };
    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
};

const useUserSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useUserSession must be used within a SessionProvider');
    }
    return context;
};

export { SessionProvider, useUserSession };

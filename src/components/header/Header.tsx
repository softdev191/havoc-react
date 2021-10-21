import { Button, Flex, Link } from '@chakra-ui/react';
import Loader from 'components/Loader';
import { Logo } from 'components/Logo';
import { useUserSession } from 'lib/Session';
import NextLink from 'next/link';

import { ProfileDropdown } from './ProfileDropdown';

export const Header = () => {
    const session = useUserSession();
    const { signedIn, loading } = session;

    if (loading) {
        return <Loader />;
    }

    return (
        <header className="navigation-background">
            <Flex
                align="center"
                justify="space-between"
                w="full"
                maxW={{ xl: '1200px' }}
                m="0 auto"
                py="2"
                px="4">
                <NextLink href="/">
                    <Link _hover={{ textDecor: 'none' }}>
                        <Logo />
                    </Link>
                </NextLink>
                {signedIn && <ProfileDropdown />}
                {!signedIn && (
                    <NextLink href="/auth/signin">
                        <Button>Log In</Button>
                    </NextLink>
                )}
            </Flex>
        </header>
    );
};

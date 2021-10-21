import { Flex, Link } from '@chakra-ui/react';
import { Logo } from 'components/Logo';
import Nav from 'components/nav/Nav';
import NextLink from 'next/link';

export const Footer = () => {
    return (
        <footer className="navigation-background">
            <Flex
                align={['center', 'center', 'center', 'center', 'center']}
                justify={[
                    'center',
                    'center',
                    'space-between',
                    'space-between',
                    'space-between'
                ]}
                direction={[
                    'column-reverse',
                    'column-reverse',
                    'row',
                    'row',
                    'row'
                ]}
                w="full"
                maxW={{ xl: '1200px' }}
                m="0 auto"
                py="6"
                px="8">
                <NextLink href="/">
                    <Link _hover={{ textDecor: 'none' }}>
                        <Logo />
                    </Link>
                </NextLink>
                <Nav />
            </Flex>
        </footer>
    );
};

export default Footer;

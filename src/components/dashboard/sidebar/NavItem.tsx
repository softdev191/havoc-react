import { Box, HStack, useColorModeValue as mode } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { ReactElement } from 'react';

interface NavItemProps {
    href?: string;
    label: string;
    icon: ReactElement;
}

export const NavItem = (props: NavItemProps) => {
    const { href = '', icon, label } = props;
    const router = useRouter();
    const bgColor = mode('gray.200', 'gray.700');

    return (
        <NextLink href={href}>
            <HStack
                w="full"
                px="3"
                py="2"
                cursor="pointer"
                userSelect="none"
                rounded="md"
                transition="all 0.2s"
                bg={router.pathname === href ? bgColor : undefined}
                _hover={{
                    bg: mode('gray.100', 'gray.700')
                }}
                _active={{
                    bg: mode('gray.300', 'gray.600')
                }}>
                <Box fontSize="lg">{icon}</Box>
                <Box flex="1" fontWeight="inherit">
                    {label}
                </Box>
            </HStack>
        </NextLink>
    );
};

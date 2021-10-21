import {
    Avatar,
    AvatarProps,
    Box,
    Flex,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue as mode,
    useMenuButton,
    UseMenuButtonProps
} from '@chakra-ui/react';
import { signIn, signOut, UserSession, useUserSession } from 'lib/Session';
import NextLink from 'next/link';
import { BiLogIn, BiLogOut, BiSidebar, BiUser } from 'react-icons/bi';

import { DarkModeSwitch } from '../DarkModeSwitch';

const UserAvatar = (props: AvatarProps) => <Avatar {...props} size="sm" />;

const ProfileMenuButton = (
    props: UseMenuButtonProps & { session: UserSession }
) => {
    const buttonProps = useMenuButton(props);
    const name = props.session.signedIn ? props.session.name : undefined;
    const image = props.session.signedIn ? props.session.image : undefined;
    return (
        <Flex
            {...buttonProps}
            as="button"
            flexShrink={0}
            rounded="full"
            outline="0">
            <Box srOnly>Open user menu</Box>
            <UserAvatar name={name} src={image} />
        </Flex>
    );
};

const AccountInfo = (props: { session: UserSession }) => {
    const avatarURL = props.session.image;
    const username = props.session.name;
    const email = props.session.email;
    return (
        <HStack px="3" py="4">
            <Avatar name={username} src={avatarURL} />
            <Box lineHeight="1">
                <Text fontWeight="semibold">{username}</Text>
                <Text mt="1" fontSize="xs" color="gray.500">
                    {email}
                </Text>
            </Box>
            <DarkModeSwitch />
        </HStack>
    );
};

export const ProfileDropdown = () => {
    const session = useUserSession();

    return (
        <Menu>
            <ProfileMenuButton session={session} />
            <MenuList rounded="md" shadow="lg" py="1" fontSize="sm">
                {session.signedIn && <AccountInfo session={session} />}
                <NextLink href="/account">
                    <MenuItem
                        fontWeight="medium"
                        icon={<BiUser fontSize="1.2rem" />}>
                        Account
                    </MenuItem>
                </NextLink>
                <NextLink href="/dashboard">
                    <MenuItem
                        fontWeight="medium"
                        icon={<BiSidebar fontSize="1.2rem" />}>
                        Dashboard
                    </MenuItem>
                </NextLink>
                {session.signedIn ? (
                    <MenuItem
                        fontWeight="medium"
                        color={mode('red.500', 'red.300')}
                        icon={<BiLogOut fontSize="1.2rem" />}
                        onClick={() => {
                            signOut();
                        }}>
                        Sign Out
                    </MenuItem>
                ) : (
                    <MenuItem
                        fontWeight="medium"
                        color={mode('green.500', 'green.300')}
                        icon={<BiLogIn fontSize="1.2rem" />}
                        onClick={() => {
                            signIn();
                        }}>
                        Sign In
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

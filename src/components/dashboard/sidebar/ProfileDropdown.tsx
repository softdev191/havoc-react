import {
    Avatar,
    Box,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue as mode
} from '@chakra-ui/react';
import { signOut, UserSession } from 'lib/Session';
import NextLink from 'next/link';
import {
    BiChevronDown,
    BiChevronLeft,
    BiLogOut,
    BiMoon,
    BiSun
} from 'react-icons/bi';

interface ProfileProps {
    username: string;
    email: string;
    avatar?: string;
}

const ProfileDropdownButton = (props: ProfileProps) => {
    return (
        <MenuButton
            rounded="lg"
            transition="all 0.2s"
            bg={mode('gray.200', 'gray.700')}
            _hover={{
                bg: mode('gray.100', 'gray.600')
            }}
            _active={{
                bg: mode('gray.300', 'gray.600')
            }}>
            <Flex w="full" alignItems="center" px="3" py="2" fontSize="sm">
                <HStack flex="1" spacing="3">
                    <Avatar
                        borderRadius="md"
                        w="8"
                        h="8"
                        src={props.avatar}
                        name={props.username}
                        alt={props.username}
                    />
                    <Box textAlign="start">
                        <Box isTruncated fontWeight="semibold">
                            {props.username}
                        </Box>
                        <Box fontSize="xs" color={mode('gray.600', 'gray.400')}>
                            {props.email}
                        </Box>
                    </Box>
                </HStack>
                <Box fontSize="lg" color={mode('gray.600', 'gray.400')}>
                    <BiChevronDown />
                </Box>
            </Flex>
        </MenuButton>
    );
};

export const ProfileDropdown = (props: { session: UserSession }) => {
    const { name: username, email, image: avatar } = props.session;
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Menu closeOnSelect={false} placement="top">
            <ProfileDropdownButton
                username={username}
                email={email}
                avatar={avatar}
            />
            <MenuList
                py="2"
                px="2"
                shadow="lg"
                color={mode('gray.600', 'gray.200')}>
                <NextLink href="/">
                    <MenuItem
                        rounded="md"
                        icon={<BiChevronLeft fontSize="1.2rem" />}>
                        Back to Repo
                    </MenuItem>
                </NextLink>
                <MenuItem
                    rounded="md"
                    onClick={toggleColorMode}
                    icon={
                        colorMode === 'light' ? (
                            <BiMoon fontSize="1.2rem" />
                        ) : (
                            <BiSun fontSize="1.2rem" />
                        )
                    }>
                    Toggle Theme
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    rounded="md"
                    fontWeight="medium"
                    color={mode('red.500', 'red.300')}
                    icon={<BiLogOut fontSize="1.2rem" />}
                    onClick={() => {
                        signOut();
                    }}>
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

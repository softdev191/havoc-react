import { Box, Divider, Flex, FlexProps, Stack } from '@chakra-ui/react';
import { useUserSession } from 'lib/Session';
import {
    BiGroup,
    BiHome,
    BiPackage,
    BiReceipt,
    BiWallet
} from 'react-icons/bi';

import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { ProfileDropdown } from './ProfileDropdown';

export const Sidebar = (props: FlexProps) => {
    const session = useUserSession();

    return (
        <Box
            height="100vh"
            w="64"
            direction="column"
            borderRightWidth="1px"
            px={4}
            py={8}
            {...props}>
            <Flex h="full" direction="column">
                <ProfileDropdown session={session} />
                <Stack spacing="8" flex="1" pt="6">
                    <NavGroup>
                        <NavItem
                            icon={<BiHome />}
                            label="Overview"
                            href="/dashboard"
                        />
                        <NavItem
                            icon={<BiPackage />}
                            label="Packages"
                            href="/dashboard/packages"
                        />
                        <NavItem
                            icon={<BiWallet />}
                            label="Wallet"
                            href="/dashboard/wallet"
                        />
                    </NavGroup>
                    <Divider />
                    <NavGroup label="Admin">
                        <NavItem
                            icon={<BiGroup />}
                            label="Accounts"
                            href="/dashboard/admin/accounts"
                        />
                        <NavItem
                            icon={<BiPackage />}
                            label="Package Submissions"
                            href="/dashboard/admin/submissions"
                        />
                        <NavItem
                            icon={<BiReceipt />}
                            label="Seller Applications"
                            href="/dashboard/admin/applications"
                        />
                    </NavGroup>
                </Stack>
            </Flex>
        </Box>
    );
};

import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    FlexProps,
    IconButton,
    Link,
    useBreakpointValue,
    useColorModeValue as mode,
    useDisclosure
} from '@chakra-ui/react';
import { Logo } from 'components/Logo';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';

import { Sidebar } from '../sidebar/Sidebar';

const useMobileMenuState = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    useEffect(() => {
        if (isMobile == false) {
            onClose();
        }
    }, [isMobile, onClose]);
    return { isOpen, onClose, onOpen };
};

export const Header = (props: FlexProps) => {
    const { isOpen, onClose, onOpen } = useMobileMenuState();

    return (
        <Flex
            align="center"
            justify="space-between"
            py="2"
            px="4"
            bg={mode('gray.50', 'gray.800')}
            borderBottomWidth="1px"
            {...props}>
            <NextLink href="/">
                <Link _hover={{ textDecor: 'none' }}>
                    <Logo />
                </Link>
            </NextLink>
            <IconButton
                onClick={onOpen}
                variant="unstyled"
                display="flex"
                cursor="pointer"
                aria-label="Menu"
                icon={<HiOutlineMenu fontSize="1.5rem" />}
            />
            <Drawer
                size="xs"
                placement="left"
                isOpen={isOpen}
                blockScrollOnMount={false}
                onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                    bg={mode('white', 'gray.800')}
                    shadow="none"
                    position="relative"
                    maxW="64">
                    <Sidebar
                        width="full"
                        height="full"
                        bg="inherit"
                        border="0"
                    />
                    <DrawerCloseButton
                        bg="blue.500"
                        _hover={{ bg: 'blue.600' }}
                        _active={{ bg: 'blue.700' }}
                        rounded="0"
                        position="absolute"
                        color="white"
                        right="-8"
                        top="0"
                    />
                </DrawerContent>
            </Drawer>
        </Flex>
    );
};

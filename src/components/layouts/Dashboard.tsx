import { Container, Flex } from '@chakra-ui/react';
import { Header } from 'components/dashboard/header/Header';
import { Sidebar } from 'components/dashboard/sidebar/Sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <Flex h="100vh" flexDirection="column">
            {/*
                No idea why, but the object syntax was not working here, so using ugly array syntax
                https://chakra-ui.com/docs/features/responsive-styles#the-array-syntax
            */}
            <Header display={['flex', 'flex', 'none']} />
            <Flex h="full" overflow="hidden">
                <Sidebar display={['none', 'none', 'block']} />
                <Flex overflow="auto" flex="1" p="6">
                    <Container maxW="container.xl">{children}</Container>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashboardLayout;

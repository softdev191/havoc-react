import { Box, Flex } from '@chakra-ui/react';
import { Container } from 'components/Container';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
    return (
        <Flex direction="column" height="100vh">
            <Header />
            <Box as="main" flex="1" py="8">
                <Container>{children}</Container>
            </Box>
            <Footer />
        </Flex>
    );
};

export default PageLayout;

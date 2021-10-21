import { Box, Flex } from '@chakra-ui/react';
import { Container } from 'components/Container';
import { ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <Flex direction="column" height="100vh">
            <Box as="main" flex="1">
                <Container height="100%">{children}</Container>
            </Box>
        </Flex>
    );
};

export default AuthLayout;

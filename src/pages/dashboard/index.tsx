import { Box, Heading } from '@chakra-ui/react';
import requireSession from 'lib/auth/getServerSideProps/requireSession';

const OverviewPage = () => {
    return (
        <Box>
            <Heading as="h3" size="lg" pb="4">
                Overview
            </Heading>
        </Box>
    );
};

export const getServerSideProps = requireSession;

export default OverviewPage;

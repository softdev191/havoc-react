import { Box, Flex } from '@chakra-ui/react';

import LoadingSpinner from './LoadingSpinner';

const Loader = () => {
    return (
        <Box height="100%">
            <Flex height="100%" align="center" justify="center">
                <LoadingSpinner />
            </Flex>
        </Box>
    );
};

export default Loader;

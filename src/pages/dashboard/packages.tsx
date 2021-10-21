import { Box, Flex, Heading } from '@chakra-ui/react';
import PackagesList from 'components/dashboard/packages/PackageList';
import UploadModal from 'components/dashboard/packages/upload/UploadModal';
import React from 'react';

const PackagesPage = () => {
    return (
        <Box width="100%">
            <Flex justifyContent="space-between">
                <Heading as="h3" size="lg" pb="4" flexGrow={1}>
                    Packages
                </Heading>
                <UploadModal />
            </Flex>

            <PackagesList />
        </Box>
    );
};

export default PackagesPage;

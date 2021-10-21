import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { ListingPageArtifacts } from 'types/Listing';

import ChangelogBox from './ChangelogBox';

const ChangelogsContainer = ({
    artifacts
}: {
    artifacts: ListingPageArtifacts[];
}) => {
    return (
        <Box>
            <Heading as="h4" size="md">
                Version History
            </Heading>
            <Flex>
                {artifacts.map((artifact) => {
                    return (
                        <ChangelogBox key={artifact.id} artifact={artifact} />
                    );
                })}
            </Flex>
        </Box>
    );
};

export default ChangelogsContainer;

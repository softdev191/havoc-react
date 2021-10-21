import { EditIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';
import { ListingPageArtifacts } from 'types/Listing';

const ChangelogBox = ({ artifact }: { artifact: ListingPageArtifacts }) => {
    const version = artifact.control.Version;

    const timestamp = new Date(artifact.createdAt).toLocaleString();

    return (
        <Flex
            dir="column"
            bgColor="gray.600"
            flexWrap="wrap"
            w="100%"
            maxW="400px"
            m="0.5em">
            <Flex w="100%">
                <Heading as="h4" size="md" flexGrow={1}>
                    {version}
                </Heading>

                <IconButton aria-label="Edit change-log" icon={<EditIcon />} />
            </Flex>

            <Heading as="h4" size="md">
                {timestamp}
            </Heading>
        </Flex>
    );
};

export default ChangelogBox;

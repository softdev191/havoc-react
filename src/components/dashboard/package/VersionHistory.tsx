import { Box, Flex, GridItem, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { BiPencil } from 'react-icons/bi';

const VersionHistory = () => {
    return (
        <GridItem>
            <Box borderRadius="md" p="4" bg="gray.700">
                <Flex alignItems="center" justifyContent="space-between" mb="4">
                    <Text fontSize="lg" color="white">
                        1.1.9
                    </Text>
                    <IconButton
                        bgColor="transparent"
                        color="white"
                        aria-label="Edit Version"
                        icon={<BiPencil />}
                    />
                </Flex>
                <Text fontSize="xl" color="white" mb="4">
                    March 1, 2021
                </Text>
                <Box as="ul" pl="4" mb="4">
                    <Text color="white" as="li">
                        Fixed Apple TV remote toggle not appearing
                    </Text>
                    <Text color="white" as="li">
                        Bug fixes and improvements
                    </Text>
                    <Text color="white" as="li">
                        Improved iPad support
                    </Text>
                </Box>
                <Text
                    decoration="underline"
                    fontWeight="semibold"
                    color="blue.400">
                    See the entire list
                </Text>
            </Box>
        </GridItem>
    );
};

export default VersionHistory;

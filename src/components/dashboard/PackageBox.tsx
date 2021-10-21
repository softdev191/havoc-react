import { CheckIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface PackageBoxProps {
    imageUrl?: string;
    title?: string;
    version?: string;
    name?: string;
    status?: number;
}

const PackageBox = (props: PackageBoxProps) => {
    const { imageUrl, title, version, name, status } = props;

    let statusIcon = <></>;
    let statusText = 'New';

    if (status === 1) {
        statusIcon = <CheckIcon w={3} h={3} />;
        statusText = 'Approved by';
    } else if (status === 2) {
        statusIcon = <CloseIcon w={3} h={3} />;
        statusText = 'Rejected';
    }

    return (
        <Box p="5" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box d="flex">
                <Image src={imageUrl} alt={title} boxSize="65px" />
                <Box
                    ml="2"
                    d="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    width="75%">
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        color="white"
                        isTruncated>
                        {title}
                    </Box>
                    <Box
                        borderRadius="md"
                        bg="whiteAlpha.300"
                        px="2"
                        py="3px"
                        width="40%">
                        <Text fontSize="1xl" color="white" align="center">
                            {version}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Text my="2" fontSize="1xl" color="white">
                Info
            </Text>
            <Box d="flex">
                <Box
                    borderRadius="md"
                    bg={status == 2 ? 'red.600' : 'lightCyan'}
                    px="2"
                    py="3px"
                    as="button"
                    mr="2">
                    <Text fontSize="14px" color="white" align="center">
                        {statusIcon} {statusText}
                    </Text>
                </Box>
                <Box
                    borderRadius="md"
                    bg="gray.600"
                    px="2"
                    py="3px"
                    as="button">
                    <Text fontSize="14px" color="white" align="center">
                        <InfoIcon /> {name}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default PackageBox;

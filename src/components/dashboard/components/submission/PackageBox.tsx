import { CheckIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

interface PackageBoxProps {
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    version?: string;
    name?: string;
    status?: number;
    shortDescription?: string;
    dependencies?: string;
    iosVersion?: string;
    changes?: string;
    description?: string;
    gallery?: GalleryProps[];
    date?: string;
    category?: string;
    price?: string;
}

type GalleryProps = {
    image: string;
};

const PackageBox = (props: PackageBoxProps) => {
    const {
        imageUrl,
        title,
        subtitle,
        version,
        name,
        status,
        shortDescription,
        dependencies,
        iosVersion,
        changes,
        description,
        gallery,
        date,
        category,
        price
    } = props;

    let statusIcon = <></>;
    let statusText = 'New';

    if (status === 1) {
        statusIcon = <CheckIcon w={3} h={3} />;
        statusText = 'Approved by';
    } else if (status === 2) {
        statusIcon = (
            <CloseIcon w={3} h={3} style={{ verticalAlign: 'revert' }} />
        );
        statusText = 'Rejected';
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                p="5"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                onClick={onOpen}>
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
                            isTruncated>
                            {title}
                        </Box>
                        <Box borderRadius="md" px="2" py="3px" width="40%">
                            <Text fontSize="1xl" align="center">
                                {version}
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Text my="2" fontSize="1xl">
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
                        <Text fontSize="14px" align="center">
                            {statusIcon} {statusText}
                        </Text>
                    </Box>
                    <Box
                        borderRadius="md"
                        bg="#4A5568"
                        px="2"
                        py="3px"
                        as="button">
                        <Text fontSize="14px" align="center">
                            <InfoIcon />
                            {name}
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="100%" width="835px" px="2" py="5">
                    <ModalHeader>
                        <Text fontSize="md">Process Submission</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box d="flex" mb="5">
                            <Image src={imageUrl} alt={title} boxSize="65px" />
                            <Box
                                ml="2"
                                d="flex"
                                flexDirection="column"
                                justifyContent="space-around"
                                width="75%">
                                <Box
                                    mt="1"
                                    fontWeight="600"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated>
                                    {title}
                                </Box>
                                <Box borderRadius="md" py="3px" width="40%">
                                    <Text
                                        fontSize="sm"
                                        color="darkGray"
                                        fontWeight="700">
                                        {subtitle}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                        <HStack spacing={3} mb="5">
                            <Tag variant="solid" size="md" colorScheme="blue">
                                {date}
                            </Tag>
                            <Tag variant="solid" size="md" colorScheme="yellow">
                                {category}
                            </Tag>
                            <Tag variant="solid" size="md" colorScheme="gray">
                                {price}
                            </Tag>
                        </HStack>

                        <SimpleGrid columns={2} spacing={6}>
                            <Stack spacing={2}>
                                <Text fontSize="md" fontWeight="600">
                                    Short Description
                                </Text>
                                <Text fontSize="sm">{shortDescription}</Text>
                            </Stack>
                            <Stack spacing={2}>
                                <Text fontSize="md" fontWeight="600">
                                    Dependencies
                                </Text>
                                <Text fontSize="sm">{dependencies}</Text>
                            </Stack>
                            <Stack spacing={2}>
                                <Text fontSize="md" fontWeight="600">
                                    IOS Version(s)
                                </Text>
                                <Text fontSize="sm">{iosVersion}</Text>
                            </Stack>
                            <Stack spacing={2}>
                                <Text fontSize="md" fontWeight="600">
                                    Changes
                                </Text>
                                <Text fontSize="sm">{changes}</Text>
                            </Stack>
                        </SimpleGrid>

                        <Text fontSize="md" fontWeight="600" mt="6" mb="3">
                            Description
                        </Text>

                        <Box
                            border="1px"
                            borderColor="gray.500"
                            borderRadius="md">
                            <Scrollbars
                                autoHeight={true}
                                autoHeightMax={190}
                                className="package-des-scrollbar">
                                <Box fontSize="sm" p="4">
                                    {description}
                                </Box>
                            </Scrollbars>
                        </Box>

                        <SimpleGrid columns={5} mt="7" gap="3">
                            {gallery &&
                                gallery.map((item, index) => (
                                    <Image
                                        key={index}
                                        src={item.image}
                                        borderRadius="md"
                                    />
                                ))}
                        </SimpleGrid>

                        <Text fontSize="md" fontWeight="600" mt="6" mb="3">
                            Description
                        </Text>
                        <Textarea
                            placeholder="Reason for declining this package... (required if declining)"
                            borderColor="gray.500"
                        />

                        <SimpleGrid columns={2} spacing={4} mt="7">
                            <Box>
                                <Button
                                    colorScheme="gray"
                                    onClick={onClose}
                                    size="lg">
                                    Cancel
                                </Button>
                            </Box>
                            <Stack spacing={4} direction="row-reverse">
                                <Button
                                    colorScheme="blue"
                                    onClick={onClose}
                                    size="lg">
                                    Accept
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={onClose}
                                    size="lg">
                                    Decline
                                </Button>
                            </Stack>
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PackageBox;

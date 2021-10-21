import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Tag,
    Text,
    Textarea,
    UnorderedList,
    useDisclosure
} from '@chakra-ui/react';

function MangeUser() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    width="835px"
                    maxWidth="835px"
                    bg="#28303F"
                    color="#fff">
                    <ModalHeader>Process Submission</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>
                            <Image src="./img/1.png" />
                            <Stack spacing={'8px'} ml={2}>
                                <Text fontSize="16px" fontWeight="700">
                                    Fluid Widget (Smoke Widget)
                                </Text>
                                <Text
                                    fontWeight="700"
                                    fontSize="14px"
                                    color="#868D95">
                                    com.papercom.glphys
                                </Text>
                            </Stack>
                        </Flex>
                        <HStack mt={2} spacing={2}>
                            <Tag color="#fff" bg="#3182CE">
                                12/12/2021
                            </Tag>
                            <Tag color="#fff" bg="#F6AD55">
                                Theme
                            </Tag>
                            <Tag color="#fff" bg="#4A5568">
                                $9.99
                            </Tag>
                        </HStack>
                        <Flex mt={'20px'}>
                            <Stack width="50%" spacing={'8px'}>
                                <Text fontSize="16px" fontWeight="700">
                                    Short Description
                                </Text>
                                <Text fontSize="14px" color="#868D95">
                                    Neumorphism/Glyphs IconPack for IOS
                                </Text>
                            </Stack>
                            <Stack width="50%" spacing={'8px'}>
                                <Text fontSize="16px" fontWeight="700">
                                    Dependencies
                                </Text>
                                <Text fontSize="14px" color="#868D95">
                                    None
                                </Text>
                            </Stack>
                        </Flex>
                        <Flex mt={'20px'}>
                            <Stack width="50%" spacing={'8px'}>
                                <Text fontSize="16px" fontWeight="700">
                                    IOS Version(s)
                                </Text>
                                <Text fontSize="14px" color="#868D95">
                                    7 - 14.5
                                </Text>
                            </Stack>
                            <Stack width="50%" spacing={'8px'}>
                                <Text fontSize="16px" fontWeight="700">
                                    Changes
                                </Text>
                                <Text fontSize="14px" color="#868D95">
                                    V1.5 adds 28 more icons. Some icons got
                                    redesigned
                                </Text>
                            </Stack>
                        </Flex>
                        <Stack mt={'20px'} width="100%" spacing={'8px'}>
                            <Text fontSize="16px" fontWeight="700">
                                Description
                            </Text>
                            <Box
                                borderWidth="1px"
                                p="15px"
                                w="100%"
                                borderRadius="4px"
                                borderColor="#5B626C">
                                <Text fontSize="14px" fontWeight="700">
                                    Welcome to CarBridge <br /> Give your car
                                    superpowers with CarBridge! Open any app
                                    from your phone and use it on your CarPlay
                                    enabled car!
                                    <br /> Features include:
                                </Text>
                                <UnorderedList fontSize="14px">
                                    <ListItem>
                                        Open any app in CarPlay (with the
                                        exemption of DRM enabled video streaming
                                        apps)
                                    </ListItem>
                                    <ListItem>
                                        Display any app on the car with its
                                        original phone layout, as you remember
                                        it
                                    </ListItem>
                                    <ListItem>
                                        Utilize the full power of your apps
                                        without limitation and use different
                                        apps on your phone and your car
                                    </ListItem>
                                    <ListItem>
                                        View and control your phone right from
                                        your car’s touch screen without picking
                                        your phone up
                                    </ListItem>
                                </UnorderedList>
                            </Box>
                        </Stack>
                        <Stack mt={'20px'} width="100%" spacing={'8px'}>
                            <Text fontSize="16px" fontWeight="700">
                                Refusal to Update
                            </Text>
                            <Textarea
                                borderColor="#5B626C"
                                placeholder="Reason for declining this package... (required if declining)"
                            />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Flex w="100%" justify="space-between">
                            <Box>
                                <Button bg="#4A5568" color="#fff">
                                    Cancel
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    colorScheme="red"
                                    mr={3}
                                    onClick={onClose}>
                                    Decline
                                </Button>
                                <Button bg="#51A4A2" color="#fff">
                                    Accept
                                </Button>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default MangeUser;

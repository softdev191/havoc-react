import { Button } from '@chakra-ui/button';
import {
    Flex,
    HStack,
    Img,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Tag,
    Text
} from '@chakra-ui/react';

interface ManageUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PurchasedProductInterface {
    id: number;
    imgStr?: string;
    productName: string;
    price?: string;
}

const ManageUserModal = (props: ManageUserModalProps) => {
    const { isOpen, onClose } = props;
    const purchasedProducts: PurchasedProductInterface[] = [
        {
            id: 1,
            imgStr: '../../../../img/1.png',
            productName: 'Fluid Widget (Smoke W...',
            price: '$9.99'
        },
        {
            id: 2,
            imgStr: '../../../../img/8.png',
            productName: 'BigSurBar',
            price: 'Free'
        },
        {
            id: 3,
            imgStr: '../../../../img/6.png',
            productName: 'BackupAZ 4 (iOS 13 - 14)',
            price: '$2.99'
        },
        {
            id: 4,
            imgStr: '../../../../img/2.png',
            productName: 'SmokeBoard Pro',
            price: '$1.99'
        },
        {
            id: 5,
            imgStr: '../../../../img/7.png',
            productName: 'Cask 2',
            price: 'Free'
        }
    ];
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width="835px" maxWidth="835px">
                    <ModalHeader fontSize="md">Manage user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb="5">
                        <Flex bg="grayC" color="gray.100" borderRadius="base">
                            <Flex
                                borderRight="1px"
                                borderRightColor="gray.600"
                                flexDirection="column"
                                placeItems="center"
                                paddingLeft="50px"
                                paddingRight="50px"
                                paddingTop="25px"
                                paddingBottom="25px">
                                <Img
                                    height="64px"
                                    width="64px"
                                    src="../../../../img/user-1.jpg"
                                    alt="user"
                                    borderRadius="base"
                                />
                                <Text mt="10px" fontSize="sm" fontWeight="700">
                                    LaughingQuoll
                                </Text>
                                <HStack mt="15px" spacing="10px">
                                    <Link href="#" isExternal>
                                        <Img src="../../../../img/apple.png" />
                                    </Link>
                                    <Link href="#" isExternal>
                                        <Img src="../../../../img/discord.png" />
                                    </Link>
                                    <Link href="#" isExternal>
                                        <Img src="../../../../img/facebook.png" />
                                    </Link>
                                    <Link href="#" isExternal>
                                        <Img src="../../../../img/google.png" />
                                    </Link>
                                </HStack>
                                <Button mt="20px" size="sm" colorScheme="red">
                                    Ban
                                </Button>
                            </Flex>
                            <Stack spacing="25px" padding="25px">
                                <Stack spacing={'8px'}>
                                    <Text fontSize="md" fontWeight="700">
                                        Account Name
                                    </Text>
                                    <Text fontWeight="400" fontSize="sm">
                                        Taryn Ernser
                                    </Text>
                                </Stack>
                                <Stack spacing={'8px'}>
                                    <Text fontSize="md" fontWeight="700">
                                        Email
                                    </Text>
                                    <Text fontWeight="400" fontSize="sm">
                                        me@laughingquoll.net
                                    </Text>
                                </Stack>
                                <Stack spacing={'8px'}>
                                    <Text fontSize="md" fontWeight="700">
                                        Account last log in date
                                    </Text>
                                    <Text fontWeight="400" fontSize="sm">
                                        May 27, 2021
                                    </Text>
                                </Stack>
                            </Stack>

                            <Stack spacing="25px" padding="25px">
                                <Stack spacing={'8px'}>
                                    <Text fontSize="md" fontWeight="700">
                                        Username
                                    </Text>
                                    <Text fontWeight="400" fontSize="sm">
                                        LaughingQuoll
                                    </Text>
                                </Stack>
                                <Stack spacing={'8px'}>
                                    <Text fontSize="md" fontWeight="700">
                                        Account creation date
                                    </Text>
                                    <Text fontWeight="400" fontSize="sm">
                                        May 13, 2021
                                    </Text>
                                </Stack>
                            </Stack>
                        </Flex>
                        <Flex
                            mt="25px"
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontSize="md" fontWeight="700">
                                Purchased products
                            </Text>
                            <Button
                                paddingX="12px"
                                paddingBottom="1px"
                                colorScheme="red"
                                size="sm">
                                Stop shopping
                            </Button>
                        </Flex>
                        <SimpleGrid
                            mt="20px"
                            minChildWidth="250px"
                            spacing="10px">
                            {purchasedProducts.map(
                                ({ id, imgStr, price, productName }) => (
                                    <Flex
                                        key={id}
                                        padding="14.5px"
                                        borderWidth="1px"
                                        borderColor="gary.400"
                                        borderRadius="4px"
                                        alignItems="flex-start">
                                        <Img src={imgStr} />
                                        <Stack spacing="8px" marginLeft="11px">
                                            <Text
                                                fontSize="sm"
                                                fontWeight="700">
                                                {productName}
                                            </Text>
                                            <Tag
                                                width="fit-content"
                                                colorScheme="gray">
                                                {price}
                                            </Tag>
                                        </Stack>
                                    </Flex>
                                )
                            )}
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ManageUserModal;

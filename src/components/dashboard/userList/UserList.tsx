import { CheckIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    Table,
    Tag,
    TagLabel,
    TagLeftIcon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { BiEditAlt, BiUser } from 'react-icons/bi';

import ManageUserModal from './MangeUserModal';

type UserListProps = {
    list: UsersProps[];
};

type UsersProps = {
    id: string;
    name: string;
    email: string;
    thumb?: string;
    creationDate: string;
    active?: boolean;
};

const UserList = (props: UserListProps) => {
    const { list } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <ManageUserModal isOpen={isOpen} onClose={onClose} />
            <Flex align="center" mb="6">
                <Text fontSize="lg" fontWeight="700">
                    List User
                </Text>
                <Spacer />
                <InputGroup width="270px">
                    <InputLeftElement pointerEvents="none">
                        <Search2Icon />
                    </InputLeftElement>
                    <Input type="tel" placeholder="Search" fontWeight="400" />
                </InputGroup>
            </Flex>
            <Box border="1px" borderColor="gray.600" borderRadius="md" p="5">
                <Table size="md" colorScheme="gray" fontSize="sm">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Account creation date</Th>
                            <Th>Status</Th>
                            <Th>Mange User</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list &&
                            list.map((user, index) => (
                                <Tr key={index}>
                                    <Td>{user.id}</Td>
                                    <Td>
                                        <Flex align="center">
                                            {user.thumb ? (
                                                <Box boxSize="32px">
                                                    <Image
                                                        src={user.thumb}
                                                        alt={user.name}
                                                        objectFit="cover"
                                                        boxSize="32px"
                                                        borderRadius="base"
                                                    />
                                                </Box>
                                            ) : (
                                                <Box
                                                    boxSize="32px"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    background="gray.700"
                                                    borderRadius="base"
                                                    color="gray.100">
                                                    <BiUser />
                                                </Box>
                                            )}
                                            <Text fontSize="sm" ml="2">
                                                {user.name}
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.creationDate}</Td>
                                    <Td>
                                        <Tag
                                            size="md"
                                            borderRadius="base"
                                            variant="solid"
                                            colorScheme={
                                                user.active ? 'cyan' : 'red'
                                            }
                                            fontWeight="400">
                                            <TagLeftIcon
                                                boxSize={
                                                    user.active ? '10px' : '8px'
                                                }
                                                as={
                                                    user.active
                                                        ? CheckIcon
                                                        : CloseIcon
                                                }
                                            />
                                            <TagLabel>
                                                {user.active
                                                    ? 'Active'
                                                    : 'Locked'}
                                            </TagLabel>
                                        </Tag>
                                    </Td>
                                    <Td>
                                        <Button
                                            variant="link"
                                            leftIcon={<BiEditAlt />}
                                            size="sm"
                                            fontWeight="400"
                                            onClick={onOpen}>
                                            Edit
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

export default UserList;

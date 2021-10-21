import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Image,
    Input,
    Switch,
    Text
} from '@chakra-ui/react';
import Uploader from 'components/dashboard/package/Uploader';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { RiGiftLine, RiHandCoinLine } from 'react-icons/ri';

import DescriptionEditor from '../dashboard/package/DescriptionEditor';
import GalleryItem from '../dashboard/package/GalleryItem';
import VersionHistory from '../dashboard/package/VersionHistory';

const Package = () => {
    return (
        <div>
            <Box>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    }}
                    gap={8}>
                    <GridItem
                        colSpan={{
                            md: 3,
                            base: 1
                        }}>
                        <Box py="8">
                            <Box mb="12">
                                <Flex mb="8">
                                    <IconButton
                                        bgColor="transparent"
                                        p="1"
                                        fontSize="3xl"
                                        size="lg"
                                        aria-label="Edit Screenshot"
                                        mr="2"
                                        icon={<BiArrowBack />}
                                    />
                                    <Text fontSize="3xl">CarBridge</Text>
                                </Flex>
                                <Box mb="8">
                                    <Text fontSize="lg" mb="3">
                                        Preview
                                    </Text>
                                    <Flex>
                                        <Image
                                            src="/img/4.png"
                                            mr="4"
                                            h="20"
                                            w="20"
                                        />
                                        <Uploader h="20" w="20" />
                                    </Flex>
                                </Box>
                                <Box>
                                    <Text fontSize="lg" mb="3">
                                        Gallery
                                    </Text>
                                    <Grid
                                        templateColumns={{
                                            base: 'repeat(2, 1fr)',
                                            md: 'repeat(3, 1fr)',
                                            lg: 'repeat(4, 1fr)',
                                            xl: 'repeat(6, 1fr)'
                                        }}
                                        gap={4}>
                                        <GalleryItem src="/img/image 5.png" />
                                        <GalleryItem src="/img/image 6.png" />
                                        <GalleryItem src="/img/image 7.png" />
                                        <GalleryItem src="/img/image 8.png" />
                                        <GalleryItem src="/img/image 10.png" />
                                        <GalleryItem src="/img/image 13.png" />
                                        <GridItem>
                                            <Uploader h="28" w="full" />
                                        </GridItem>
                                    </Grid>
                                </Box>
                            </Box>
                            <Box mb="8">
                                <form>
                                    <Text fontSize="2xl" mb="8">
                                        General info
                                    </Text>
                                    <Box mb="8">
                                        <Text fontSize="lg" mb="3">
                                            Product Name
                                        </Text>
                                        <Input placeholder="Enter the title" />
                                    </Box>
                                    <Box mb="8">
                                        <Text fontSize="lg" mb="3">
                                            Description
                                        </Text>
                                        <DescriptionEditor
                                            value={undefined}
                                            setValue={undefined}
                                        />
                                    </Box>
                                    <Box mb="8">
                                        <Text fontSize="lg" mb="3">
                                            Information
                                        </Text>
                                        <Input placeholder="IOS Version(s)" />
                                    </Box>
                                    <Box mb="8">
                                        <Text fontSize="lg" mb="3">
                                            What&apos;s New
                                        </Text>
                                        <DescriptionEditor
                                            value={undefined}
                                            setValue={undefined}
                                        />
                                    </Box>
                                    <Center>
                                        <Button
                                            size="lg"
                                            bgColor="blue.400"
                                            color="white"
                                            colorScheme="blue">
                                            Publich
                                        </Button>
                                    </Center>
                                </form>
                            </Box>
                            <Box>
                                <Text fontSize="lg" mb="3">
                                    Version History
                                </Text>
                                <Grid
                                    templateColumns={{
                                        base: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)'
                                    }}
                                    gap={8}>
                                    <VersionHistory />
                                    <VersionHistory />
                                </Grid>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Box py="8">
                            <Box>
                                <Box mb="8">
                                    <Text fontSize="lg" mb="3">
                                        Price
                                    </Text>
                                    <Input placeholder="$  Enter the price" />
                                </Box>
                                <FormControl
                                    mb="6"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    d="flex">
                                    <FormLabel htmlFor="free-switch">
                                        Free
                                    </FormLabel>
                                    <Switch id="free-switch" />
                                </FormControl>
                                <Box>
                                    <Flex mb="2" alignItems="center">
                                        <Icon
                                            fontSize="2xl"
                                            mr="3"
                                            as={IoMdInformationCircleOutline}
                                        />
                                        <Text
                                            fontWeight="semibold"
                                            fontSize="xl">
                                            Information
                                        </Text>
                                    </Flex>
                                    <Text pl="10">
                                        For each transaction, the platform
                                        <br />
                                        takes 30% of the cost. Your share
                                        <br />
                                        is 70%
                                    </Text>
                                </Box>
                            </Box>
                            <Box as="hr" my="10" />
                            <Box>
                                <FormControl
                                    mb="6"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    d="flex">
                                    <FormLabel htmlFor="refund-switch">
                                        Refund
                                    </FormLabel>
                                    <Switch id="refund-switch" />
                                </FormControl>
                                <Box
                                    bgColor="teal.400"
                                    mb="3"
                                    borderRadius="md">
                                    <Flex p="3" alignItems="center">
                                        <Box mr="3">
                                            <Icon
                                                as={RiHandCoinLine}
                                                fontSize="3xl"
                                                color="white"
                                            />
                                        </Box>
                                        <Box>
                                            <Text
                                                mb="1"
                                                fontWeight="semibold"
                                                color="white"
                                                fontSize="xl">
                                                Refund
                                            </Text>
                                            <Text color="white">
                                                We will refund your purchase
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box mb="8">
                                    <Text fontSize="lg" mb="3">
                                        Price
                                    </Text>
                                    <Input
                                        placeholder="Email"
                                        mb="2"
                                        type="email"
                                    />
                                    <Button
                                        colorScheme="blue"
                                        bgColor="blue.400"
                                        color="white"
                                        w="full"
                                        size="lg">
                                        Return
                                    </Button>
                                </Box>
                                <Box as="hr" my="10" />
                                <FormControl
                                    mb="6"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    d="flex">
                                    <FormLabel htmlFor="present-switch">
                                        Present
                                    </FormLabel>
                                    <Switch id="present-switch" />
                                </FormControl>
                                <Box bgColor="red.500" borderRadius="md">
                                    <Flex p="3" alignItems="center">
                                        <Box mr="3">
                                            <Icon
                                                as={RiGiftLine}
                                                fontSize="3xl"
                                                color="white"
                                            />
                                        </Box>
                                        <Box>
                                            <Text
                                                mb="1"
                                                color="white"
                                                fontWeight="semibold"
                                                fontSize="xl">
                                                Present
                                            </Text>
                                            <Text color="white">
                                                We give gifts for the purchase
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
};

export default Package;

import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';

SwiperCore.use([Pagination, Navigation]);

const Product = () => {
    const router = useRouter();
    const { id } = router.query;
    const dataRoute = `/api/package/${id}`;

    const { data: listing } = useSWR(id ? dataRoute : null);
    return listing ? (
        <Box w="100%">
            <Container maxW="container.xl">
                <Grid
                    templateColumns={{
                        base: 'repeat(2, 1fr)',
                        md: 'repeat(7, 1fr)'
                    }}
                    gap={8}>
                    <GridItem colSpan={2}>
                        <Box
                            bg="rgba(240, 244, 255, 0.4)"
                            p={{
                                base: 6,
                                md: 8
                            }}
                            py={8}>
                            <Flex mb={4} justify="center">
                                <Image
                                    w={40}
                                    h={40}
                                    src={listing.icon}
                                    alt="Product Icon"
                                />
                            </Flex>
                            <Center mb={6}>
                                <Text fontWeight="600" fontSize="xl">
                                    {listing.displayName}
                                </Text>
                            </Center>
                            <Button
                                w="100%"
                                size="md"
                                mb={6}
                                colorScheme="blue">
                                ${numeral(listing.price).format('0.00')}
                            </Button>
                            <Text fontWeight="600" fontSize="sm" mb={3}>
                                Information
                            </Text>
                            <Box
                                d={{
                                    base: 'flex',
                                    md: 'block'
                                }}
                                justifyContent="space-between">
                                <Box mb={2}>
                                    <Text
                                        fontWeight="600"
                                        fontSize="sm"
                                        mb={1}
                                        color="gray.300">
                                        Version
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {listing?.artifact?.Version}
                                    </Text>
                                </Box>
                                <Box mb={2}>
                                    <Text
                                        fontWeight="600"
                                        fontSize="sm"
                                        mb={1}
                                        color="gray.300">
                                        Updated
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        March 1, 2021
                                        {listing?.artifact?.createdAt}
                                    </Text>
                                </Box>
                                <Box mb={2}>
                                    <Text
                                        fontWeight="600"
                                        fontSize="sm"
                                        mb={1}
                                        color="gray.300">
                                        IOS Version
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {listing?.iosVersions?.startVersion} -{' '}
                                        {listing?.iosVersions?.endVersion}
                                    </Text>
                                </Box>
                            </Box>
                            <Box as="hr" my={4} />
                            <Text fontWeight="600" fontSize="sm" mb={3}>
                                Sellers
                            </Text>
                            <Flex mb={2}>
                                <Box mr={2}>
                                    <Avatar size="sm" src="/img/40.png" />
                                </Box>
                                <Box>
                                    <Text fontSize="xs">Laughing Out</Text>
                                    <Text fontSize="xs" color="gray.500">
                                        me@laughingout.me
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex mb={2}>
                                <Box mr={2}>
                                    <Avatar size="sm" src="/img/41.png" />
                                </Box>
                                <Box>
                                    <Text fontSize="xs">Laughing Out</Text>
                                    <Text fontSize="xs" color="gray.500">
                                        me@laughingout.me
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            md: 5,
                            sm: 2,
                            base: 2
                        }}>
                        <Box>
                            <Box mb="14">
                                <Box>
                                    <Text fontWeight="600" mb="5" fontSize="xl">
                                        Gallery
                                    </Text>
                                </Box>
                                <Box>
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={8}
                                        pagination={{
                                            type: 'progressbar'
                                        }}
                                        breakpoints={{
                                            '1024': {
                                                slidesPerView: 5,
                                                spaceBetween: 16
                                            }
                                        }}>
                                        {listing.screenshots.map(
                                            (screenshot: {
                                                filePath: string;
                                                id: string;
                                            }) => (
                                                <SwiperSlide
                                                    key={screenshot.id}>
                                                    <Box>
                                                        <Image
                                                            src={
                                                                screenshot.filePath
                                                            }
                                                        />
                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        )}
                                    </Swiper>
                                </Box>
                            </Box>
                            <Box>
                                <Text fontWeight="600" mb="5" fontSize="xl">
                                    Description
                                </Text>
                                <Box>{listing.descripion}</Box>
                            </Box>
                            <Box>
                                <Flex justify="space-between" my="4">
                                    <Text fontWeight="600" fontSize="xl">
                                        What&apos;s New
                                    </Text>
                                    <Text
                                        as="a"
                                        href="#"
                                        color="blue.400"
                                        fontWeight="semibold">
                                        Version History
                                    </Text>
                                </Flex>
                                <Box as="ul" pl="4">
                                    {listing.changelog.map((change: string) => (
                                        <Box as="li" mb="3" key={change}>
                                            {change}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    ) : null;
};

export default Product;

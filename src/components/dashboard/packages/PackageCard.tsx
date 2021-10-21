import {
    Avatar,
    Badge,
    Box,
    Flex,
    forwardRef,
    LinkBox,
    LinkOverlay,
    Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

import { StatusTag } from '../../StatusTag';

export interface PackagesEntity {
    id: string;
    packageID: string;
    displayName: string;
    icon: string;
    price: number;
}

interface PackageCardProps {
    packageInfo: PackagesEntity;
    packageStatus?: Array<string>;
}

const PackageCard = forwardRef<PackageCardProps, 'div'>((props, ref) => {
    const { packageInfo, packageStatus, ...rest } = props;

    return (
        <LinkBox as="article" ref={ref} {...rest}>
            <NextLink href={`/dashboard/package/${packageInfo.id}`} passHref>
                <LinkOverlay>
                    <Box
                        borderRadius="4px"
                        border={'1px solid #5B626C'}
                        padding="15px"
                        maxW="262px"
                        fontSize="14px"
                        lineHeight="1.5">
                        <Flex>
                            <Avatar
                                name={packageInfo.displayName}
                                src={packageInfo.icon}
                                mr="8px"
                                width="58px"
                                height="58px"
                                borderRadius="4px"
                            />
                            <Box maxW="164px">
                                <Box>
                                    <Text isTruncated>
                                        {packageInfo.displayName}
                                    </Text>
                                </Box>
                                {packageInfo.price !== null && (
                                    <Badge
                                        borderRadius="4px"
                                        p={'2px 8px'}
                                        mt="10px"
                                        color="white"
                                        fontWeight="700"
                                        bg="gray.700">
                                        {packageInfo.price === 0
                                            ? 'Free'
                                            : `$${packageInfo.price}`}
                                    </Badge>
                                )}
                            </Box>
                        </Flex>
                        {packageStatus && packageStatus.length > 0 && (
                            <Box mt="10px">
                                <Box fontWeight="700">Status</Box>
                                <Flex flexWrap="wrap">
                                    {packageStatus.map(
                                        (value: string, index: number) => {
                                            return (
                                                <StatusTag
                                                    key={index}
                                                    type={value}
                                                    text={
                                                        !value
                                                            ? props?.packageInfo
                                                                  .packageID
                                                            : ''
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </Flex>
                            </Box>
                        )}
                    </Box>
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    );
});

export default PackageCard;

import { Box, Flex, Skeleton } from '@chakra-ui/react';
import ShowError from 'components/Error/ShowError';
import React from 'react';
import useSWR from 'swr';

import PackageCard, { PackagesEntity } from './PackageCard';
import PendingPackageCell from './PendingPackageCell';

export interface PackageListResponse {
    pending?: number;
    packages?: PackagesEntity[] | null;
}

const PackagesList = () => {
    const {
        data,
        error
    }: { data?: PackageListResponse; error?: Error } = useSWR(
        '/api/dashboard/packages'
    );

    if (error) {
        return <ShowError err={error} />;
    }

    if (!data) {
        return <Skeleton />;
    }

    return (
        <Box>
            {data.pending && data.pending > 0 && (
                <PendingPackageCell pendingCount={data.pending} />
            )}
            {data.packages && (
                <Flex flexWrap="wrap" pt=".5em">
                    {data.packages.map(
                        (value: PackagesEntity, index: number) => {
                            return (
                                <PackageCard
                                    key={index}
                                    mr="20px"
                                    mb="20px"
                                    packageInfo={value}
                                    packageStatus={['approved', '']}
                                />
                            );
                        }
                    )}
                </Flex>
            )}
        </Box>
    );
};

export default PackagesList;

import { Box, Flex } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import arrayMove from 'array-move';
import {
    ListingActionType,
    ListingDispatch
} from 'pages/dashboard/package/[id]';
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import ScreenshotUploadButton from '../upload/ScreenshotUploadItem';
import ScreenshotItem from './item/ScreenshotItem';

const SortableItem = SortableElement(
    ({ children }: { children: React.ReactNode }) => <>{children}</>
);

const SortableList = SortableContainer(
    ({
        screenshots,
        dispatch,
        listingID
    }: {
        screenshots: string[] | undefined;
        dispatch: ListingDispatch;
        listingID: string;
    }) => {
        return (
            <Flex flexDir="row" flexWrap={'wrap'}>
                {screenshots &&
                    screenshots.map((value: string, index: number) => {
                        if (value === 'PENDING') {
                            return (
                                <Skeleton
                                    key={`PENDING`}
                                    h="200px"
                                    w="100px"
                                    m="0.5em"
                                />
                            );
                        }

                        return (
                            <SortableItem key={value} index={index}>
                                <Box w="auto" h="200px" m="0.5em">
                                    <ScreenshotItem
                                        screenshotID={value}
                                        dispatch={dispatch}
                                    />
                                </Box>
                            </SortableItem>
                        );
                    })}
                <ScreenshotUploadButton
                    listingID={listingID}
                    dispatch={dispatch}
                />
            </Flex>
        );
    }
);

const ScreenshotViewer = ({
    dispatch,
    screenshots,
    listingID
}: {
    dispatch: ListingDispatch;
    screenshots: string[] | undefined;
    listingID: string;
}) => {
    const onSortEnd = ({
        oldIndex,
        newIndex
    }: {
        oldIndex: number;
        newIndex: number;
    }) => {
        if (!screenshots) return;
        dispatch({
            type: ListingActionType.REORDER_SCREENSHOTS,
            value: { screenshots: arrayMove(screenshots, oldIndex, newIndex) }
        });
    };

    return (
        <SortableList
            axis="xy"
            screenshots={screenshots}
            dispatch={dispatch}
            onSortEnd={onSortEnd}
            listingID={listingID}
        />
    );
};

export default ScreenshotViewer;

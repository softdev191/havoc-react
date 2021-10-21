import { Box, Heading } from '@chakra-ui/react';
import { ListingDispatch } from 'pages/dashboard/package/[id]';

import ScreenshotViewer from './viewer/ScreenshotViewer';

const ScreenshotEditor = ({
    dispatch,
    screenshots,
    listingID
}: {
    dispatch: ListingDispatch;
    screenshots: string[] | undefined;
    listingID: string;
}) => {
    return (
        <Box>
            <Heading as="h4" size="md">
                {'Screenshots'}
            </Heading>
            <ScreenshotViewer
                screenshots={screenshots}
                dispatch={dispatch}
                listingID={listingID}
            />
        </Box>
    );
};

export default ScreenshotEditor;

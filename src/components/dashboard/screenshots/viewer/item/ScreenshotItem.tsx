import { Box, Image } from '@chakra-ui/react';
import { ListingDispatch } from 'pages/dashboard/package/[id]';

import ScreenshotItemOverlay from './ScreenshotItemOverlay';

const ScreenshotItem = ({
    screenshotID,
    dispatch
}: {
    screenshotID: string;
    dispatch: ListingDispatch;
}) => {
    const url = `/api/screenshot/${screenshotID}`;

    return (
        <Box h="100%" position="relative">
            <ScreenshotItemOverlay
                screenshotID={screenshotID}
                dispatch={dispatch}
            />
            <Image
                src={url}
                alt="A very nice image"
                h="100%"
                backgroundColor={'green'}
            />
        </Box>
    );
};

export default ScreenshotItem;

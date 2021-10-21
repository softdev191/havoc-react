import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import {
    ListingActionType,
    ListingDispatch
} from 'pages/dashboard/package/[id]';

const ScreenshotItemOverlay = ({
    screenshotID,
    dispatch
}: {
    screenshotID: string;
    dispatch: ListingDispatch;
}) => {
    return (
        <Box
            position="absolute"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            boxSize="100%"
            opacity={0}
            transition="opacity 0.3s, visibility 0.3s"
            _hover={{ opacity: 1 }}>
            <IconButton
                aria-label="Search database"
                icon={<CloseIcon />}
                onClick={() => {
                    dispatch({
                        type: ListingActionType.REMOVE_SCREENSHOT,
                        value: { screenshotToRemove: screenshotID }
                    });
                }}
            />
        </Box>
    );
};

export default ScreenshotItemOverlay;

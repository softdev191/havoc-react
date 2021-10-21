import { Box, Button, Input } from '@chakra-ui/react';
import {
    ListingActionType,
    ListingDispatch
} from 'pages/dashboard/package/[id]';
import React, { useState } from 'react';

async function uploadScreenshot(
    file: File,
    listingID: string
): Promise<string> {
    console.debug('begin upload', file);

    const formData = new FormData();
    formData.append('screenshot', file);

    const uploadRes = await (
        await fetch(
            `/api/dashboard/screenshot/upload?` +
                new URLSearchParams({
                    id: listingID
                }),
            {
                method: 'POST',
                body: formData
            }
        )
    )
        .json()
        .catch((err) => {
            throw err;
        });
    console.debug('upload result', uploadRes);
    return uploadRes.id;
}

const ScreenshotUploadItem = ({
    listingID,
    dispatch
}: {
    listingID: string;
    dispatch: ListingDispatch;
}) => {
    const [uploadInput, setUploadInput] = useState<HTMLInputElement>();

    return (
        <Box m="0.5em">
            <Input
                multiple
                type="file"
                hidden
                ref={(t) => {
                    setUploadInput(t as HTMLInputElement);
                }}
                onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) {
                        throw 'NO FILES';
                    }

                    const file = files.item(0);
                    if (!file) {
                        throw 'FILE IS NULL';
                    }

                    // add placeholder
                    dispatch({
                        type: ListingActionType.ADD_PENDING_SCREENSHOT
                    });

                    const id = await uploadScreenshot(file, listingID);

                    // add new screenshot id
                    dispatch({
                        type: ListingActionType.ADD_FINALIZED_SCREENSHOT,
                        value: { screenshotToAdd: id }
                    });
                }}
            />
            <Button
                onClick={() => {
                    uploadInput?.click();
                }}>
                Upload Screenshot
            </Button>
        </Box>
    );
};

export default ScreenshotUploadItem;

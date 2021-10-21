import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useSWR from 'swr';

async function uploadFile(
    file: File
): Promise<{ id?: string; result: string }> {
    const formData = new FormData();
    formData.append('artifact', file);

    const uploadRes = await (
        await fetch(`/api/dashboard/artifact/upload`, {
            method: 'POST',
            body: formData
        })
    ).json();
    return uploadRes;
}

const UploadModal = () => {
    const [uploadInput, setUploadInput] = useState<HTMLInputElement>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [artifactID, setArtifactID] = useState<string>();

    const { data: statusData } = useSWR(
        artifactID
            ? '/api/dashboard/artifact/status?' +
                  new URLSearchParams({
                      id: artifactID
                  })
            : null,
        {
            refreshInterval: 5
        }
    );

    return (
        <Box>
            <Modal size="md" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Upload</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {statusData ? statusData.status : 'UNKNOWN STATUS'}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box>
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

                        // open upload modal
                        onOpen();
                        const res = await uploadFile(file);
                        if (res.id && res.result === 'success') {
                            setArtifactID(res.id);
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        uploadInput?.click();
                    }}>
                    Upload
                </Button>
            </Box>
        </Box>
    );
};

export default UploadModal;

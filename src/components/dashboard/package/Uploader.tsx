import { Flex, Icon } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlinePlus } from 'react-icons/hi';

interface UploaderType {
    h: string;
    w: string;
}

const Uploader = ({ h, w }: UploaderType) => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Flex
                as="button"
                alignItems="center"
                justifyContent="center"
                h={h}
                backgroundImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='gray' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
                borderRadius="lg"
                w={w}
                className="customized-border">
                <Icon as={HiOutlinePlus} fontSize="3xl" />
            </Flex>
        </div>
    );
};

export default Uploader;

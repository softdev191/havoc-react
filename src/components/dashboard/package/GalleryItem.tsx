import { Box, GridItem, IconButton, Image } from '@chakra-ui/react';
import React from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { CgEye } from 'react-icons/cg';
import { IoMoveOutline } from 'react-icons/io5';

interface GalleryItemProps {
    src: string;
}

const GalleryItem = ({ src }: GalleryItemProps) => {
    return (
        <GridItem>
            <Box position="relative" w="full" cursor="pointer" role="group">
                <Image src={src} w="full" h="28" alt="" />
                <Box
                    alignItems="center"
                    justifyContent="center"
                    d="flex"
                    opacity="0"
                    className="transition-adjust"
                    _groupHover={{ opacity: '1' }}
                    transition="0.25s"
                    position="absolute"
                    h="full"
                    w="full"
                    top="0"
                    left="0">
                    <IconButton
                        bgColor="transparent"
                        _hover={{
                            bg: 'whiteAlpha.300',
                            color: 'white'
                        }}
                        color="white"
                        aria-label="Edit Screenshot"
                        icon={<IoMoveOutline />}
                    />
                    <IconButton
                        bgColor="transparent"
                        _hover={{
                            bg: 'whiteAlpha.300',
                            color: 'white'
                        }}
                        color="white"
                        aria-label="View Screenshot"
                        icon={<CgEye />}
                    />
                    <IconButton
                        bgColor="transparent"
                        _hover={{
                            bg: 'whiteAlpha.300',
                            color: 'white'
                        }}
                        color="white"
                        aria-label="Delete Screenshot"
                        icon={<BiTrashAlt />}
                    />
                </Box>
            </Box>
        </GridItem>
    );
};

export default GalleryItem;

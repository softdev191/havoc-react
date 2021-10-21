import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import MenuItem from './MenuItem';

const Nav = () => {
    return (
        <Box
            w="100%"
            display={{ md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}>
            <Flex
                w="100%"
                align={['center', 'center', 'center', 'center', 'center']}
                justify={[
                    'space-between',
                    'space-between',
                    'flex-end',
                    'flex-end',
                    'flex-end'
                ]}
                direction={['row', 'row', 'row', 'row', 'row']}
                pt={[0, 0, 0, 0, 0]}>
                <MenuItem to="/about">About</MenuItem>
                <MenuItem to="/for-sellers">For Sellers</MenuItem>
                <MenuItem to="/support">Support</MenuItem>
                <MenuItem to="/privacy-policy" isLast>
                    Privacy Policy
                </MenuItem>
            </Flex>
        </Box>
    );
};

export default Nav;

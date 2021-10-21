import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
    xs: '0em',
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em'
});

const theme = extendTheme({
    colors: {
        black: '#16161D',
        darkBlue: '#1A202C',
        white: {
            100: '#E5E5E5'
        },
        grayB: '#2D3748',
        grayC: '#28303F',
        darkGray: '#868D95',
        lightCyan: '#51A4A2'
    },
    fonts,
    breakpoints,
    styles: {
        global: (props) => ({
            '.markdown-toolbar': {
                bg: mode('white', 'gray.500')(props),
                borderBottomColor: mode('gray.200', 'whiteAlpha.300')(props)
            },
            '.markdown-textArea': {
                bg: mode('white', 'gray.700')(props)
            },
            '.navigation-background': {
                bg: mode('gray.700', 'white')(props)
            },
            '.mde-header ul.mde-header-group li.mde-header-item button': {
                color: mode('black', 'white')(props)
            },
            '.react-mde': {
                borderColor: mode('gray.200', 'whiteAlpha.300')(props)
            },
            '.mde-header.markdown-toolbar': {
                bg: mode('white', 'gray.800')(props),
            },
            '.markdown-textArea.mde-text': {
                bg: mode('white', 'gray.800')(props)
            },
        })
    }
});

export default theme;

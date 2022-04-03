import { extendTheme } from '@chakra-ui/react';

// @ts-ignore
const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                color: 'gray.600',
                lineHeight: '1.2',
            },
        },
    },
});

export default theme;

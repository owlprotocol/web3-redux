import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from '../constants';

const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            color: '#fff',
        },
    },
};

const themeOverrides = {
    styles: {
        global: {
            'html, body': {
                color: 'gray.600',
                lineHeight: '1.2',
            },
        },
    },
    textStyles: {
        title: {
            // responsive sizes TBA
            fontSize: ['20px', '20px'],
            fontWeight: '400',
            lineHeight: '27px',
        },
    },
    components,
    themes: THEME_COLORS['theme1'],
};

// @ts-ignore
const theme = extendTheme(themeOverrides);

export default theme;

import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from '../constants';

const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            color: '#fff',
        },
    },
    a: {
        hover: {
            color: 'red',
        },
    },
};

const themeOverrides = {
    styles: {
        global: {
            'html, body': {
                color: THEME_COLORS.theme1.color4,
                lineHeight: '1.2',
                backgroundColor: THEME_COLORS.theme1.background,
            },
            a: {
                color: THEME_COLORS.theme1.color4,
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
    themes: THEME_COLORS.theme1,
};

// @ts-ignore
const theme = extendTheme(themeOverrides);

export default theme;

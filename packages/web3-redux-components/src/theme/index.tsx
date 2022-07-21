import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from '../constants/index.js';

const CURRENT_THEME = 'theme1';

const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'transparent',
            _hover: {
                color: THEME_COLORS[CURRENT_THEME].color1,
            },
        },
        variants: {
            form: {
                color: '#fff',
                borderRadius: '12px',
                backgroundColor: THEME_COLORS[CURRENT_THEME].color1,
                _hover: {
                    color: '#fff',
                },
            },
        },
    },
    FormLabel: {
        baseStyle: {
            color: THEME_COLORS[CURRENT_THEME].color9,
            fontSize: '16px',
            fontWeight: 600,
        },
    },
    Input: {
        variants: {
            form: {
                height: '52px',
                color: THEME_COLORS[CURRENT_THEME].color4,
                backgroundColor: THEME_COLORS[CURRENT_THEME].color5,
                borderRadius: '8px',
            },
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
                color: THEME_COLORS[CURRENT_THEME].color4,
                lineHeight: '1.2',
                backgroundColor: THEME_COLORS[CURRENT_THEME].background,
            },
            a: {
                color: THEME_COLORS[CURRENT_THEME].color4,
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
    themes: THEME_COLORS[CURRENT_THEME],
};

// @ts-ignore
const theme = extendTheme(themeOverrides);

export default theme;

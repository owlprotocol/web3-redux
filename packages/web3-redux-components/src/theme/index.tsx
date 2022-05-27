import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from '../constants';

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

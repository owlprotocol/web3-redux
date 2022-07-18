import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@owlprotocol/web3-redux';
import { withMockData, withWeb3ReactProvider } from '../src/hoc/index.js';
import { THEME_COLORS } from '../src/constants';

import theme from '../src/theme';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'owl',
        values: [
            {
                name: 'owl',
                value: THEME_COLORS.theme1.storyBG,
            },
            {
                name: 'white',
                value: THEME_COLORS.theme1.color7,
            },
        ],
    },
}

export const decorators = [
    (Story) => {
        const StoryWithWeb3 = withWeb3ReactProvider(Story)
        const StoryWithData = withMockData(StoryWithWeb3)
        return (
            <Router>
                <Provider store={store}>
                    <ChakraProvider theme={theme}>
                        <StoryWithData />
                    </ChakraProvider>
                </Provider>
            </Router>
        )
    }
];

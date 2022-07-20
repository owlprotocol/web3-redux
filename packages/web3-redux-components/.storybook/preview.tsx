import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@owlprotocol/web3-redux';
import { withMockData } from '../src/hoc/withMockData';
import { THEME_COLORS } from '../src/constants';
import { WalletContext } from '../src/constants/web3React';
import { getLibrary } from '../src/utils/getLibrary';

import theme from '../src/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
};

//Browser wallet context provider
const Web3ProviderWallet = createWeb3ReactRoot(WalletContext);

export const decorators = [
    (Story) => {
        const StoryWithData = withMockData(Story);
        return (
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ProviderWallet getLibrary={getLibrary}>
                    <Router>
                        <Provider store={store}>
                            <ChakraProvider theme={theme}>
                                <StoryWithData />
                            </ChakraProvider>
                        </Provider>
                    </Router>
                </Web3ProviderWallet>
            </Web3ReactProvider>
        );
    },
];

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getEnvironment } from '../src/environment';
import {
    Network, Contract, TestData, store,
    Environment
} from '@owlprotocol/web3-redux';
Environment.setEnvironment(getEnvironment());

import { THEME_COLORS } from '../src/constants';
import { WalletContext } from '../src/constants/web3React'
import { getLibrary } from '../src/utils/getLibrary'
import { withMockData } from '../src/hoc';

import { ChakraProvider } from '@chakra-ui/react';
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
                value: THEME_COLORS['theme1'].storyBG,
            },
            {
                name: 'white',
                value: THEME_COLORS['theme1'].color7,
            },
        ],
    },
}

//Browser wallet context provider
const Web3ProviderWallet = createWeb3ReactRoot(WalletContext)

export const decorators = [
    (Story) => {
        const StoryWithData = withMockData(Story, [
            Network.create({ networkId: '1' }),     //Mainnet
            Network.create({ networkId: '42161' }), //Arbitrum
            Network.create({ networkId: '10' }),    //Optimism
            Network.create({ networkId: '137' }),   //Polygon
            Contract.create(TestData.contractVITALIK),
            Contract.create(TestData.contractWETH),
        ]);
        return (
            <ThemeProvider theme={THEME_COLORS.theme1}>
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
            </ThemeProvider>
        )
    }
];

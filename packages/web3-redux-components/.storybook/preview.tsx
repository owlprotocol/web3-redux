import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { useEffect } from 'react';
import { getEnvironment } from '../src/environment';
import {
    Network, Contract, TestData, store,
    Environment
} from '@owlprotocol/web3-redux';

//@ts-ignore
Environment.setEnvironment(getEnvironment());

import { THEME_COLORS } from '../src/constants';
import { WalletContext } from '../src/constants/web3React'
import { getLibrary } from '../src/utils/getLibrary'

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';
import getDisplayName from '../src/hoc/getDisplayName';

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

export const withMockData = (WrappedComponent: any) => {
    const Component = (props: any) => {
        const dispatch = useDispatch();

        const [networkMainnet, networkArbitrum, networkOptimism, networkPolygon] = useSelector((state) =>
            Network.selectByIdMany(state, [
                '1', '42161', '10', '137'
            ])
        )
        useEffect(() => { if (!networkMainnet) dispatch(Network.create({ networkId: '1' })) }, [networkMainnet])
        useEffect(() => { if (!networkArbitrum) dispatch(Network.create({ networkId: '42161' })) }, [networkArbitrum])
        useEffect(() => { if (!networkOptimism) dispatch(Network.create({ networkId: '10' })) }, [networkOptimism])
        useEffect(() => { if (!networkPolygon) dispatch(Network.create({ networkId: '137' })) }, [networkPolygon])

        const [contractVITALIK,
            contractWETH, contractUSDC, contractTETHER, contractCHAINLINK,
            contractVeeFriendsSeries2, contractOZTeam, contractKithFriends] =
            useSelector((state) =>
                Contract.selectByIdMany(state, [
                    { networkId: '1', address: TestData.VITALIK },
                    { networkId: '1', address: TestData.WETH },
                    { networkId: '1', address: TestData.USDC },
                    { networkId: '1', address: TestData.TETHER },
                    { networkId: '1', address: TestData.CHAINLINK },
                    { networkId: '1', address: TestData.VEE_FRIENDS_SERIES2 },
                    { networkId: '1', address: TestData.OZ_TEAM },
                    { networkId: '1', address: TestData.KITH_FRIENDS }
                ])
            )
        useEffect(() => { if (!contractVITALIK) dispatch(Contract.create(TestData.contractVITALIK)) }, [contractVITALIK])
        useEffect(() => { if (!contractWETH) dispatch(Contract.create(TestData.contractWETH)) }, [contractWETH])
        useEffect(() => { if (!contractUSDC) dispatch(Contract.create(TestData.contractUSDC)) }, [contractUSDC])
        useEffect(() => { if (!contractTETHER) dispatch(Contract.create(TestData.contractTETHER)) }, [contractTETHER])
        useEffect(() => { if (!contractCHAINLINK) dispatch(Contract.create(TestData.contractCHAINLINK)) }, [contractCHAINLINK])
        useEffect(() => { if (!contractVeeFriendsSeries2) dispatch(Contract.create(TestData.contractVeeFriendsSeries2)) }, [contractVeeFriendsSeries2])
        useEffect(() => { if (!contractOZTeam) dispatch(Contract.create(TestData.contractOZTeam)) }, [contractOZTeam])
        useEffect(() => { if (!contractKithFriends) dispatch(Contract.create(TestData.contractKithFriends)) }, [contractKithFriends])

        return <WrappedComponent {...props} />;
    };
    Component.displayName = `withMockData(${getDisplayName(WrappedComponent)})`;
    return Component;
};

export const decorators = [
    (Story) => {
        const StoryWithData = withMockData(Story)
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
        )
    }
];

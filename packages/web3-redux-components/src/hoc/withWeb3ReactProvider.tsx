import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Network } from '@web3-react/network';
import getDisplayName from './getDisplayName.js';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask.js';

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    //[walletConnect, walletConnectHooks],
    //[coinbaseWallet, coinbaseWalletHooks],
    //[network, networkHooks],
];

// eslint-disable-next-line react/display-name
export const withWeb3ReactProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <Web3ReactProvider connectors={connectors} lookupENS={false}>
                <WrappedComponent {...props} />
            </Web3ReactProvider>
        );
    };

    component.displayName = `withWeb3ReactProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withWeb3ReactProvider;

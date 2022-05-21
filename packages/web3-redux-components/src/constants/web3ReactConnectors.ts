import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

import { SUPPORTED_CHAIN_IDS } from './web3React';

const { isHex, hexToNumberString } = Web3.utils;
//Browser injected connector (Metamask)
export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS.map((x) => parseInt(x)),
});

//Patch chainChanged 0xNaN
//https://github.com/NoahZinsmeister/web3-react/issues/73
//@ts-ignore
const handleChainChanged = injected.handleChainChanged;
//@ts-ignore
injected.handleChainChanged = (chainId: string | number) => {
    // eslint-disable-next-line prettier/prettier
    console.debug('Handling \'chainChanged\' event with payload', chainId);
    if (chainId === '0xNaN' || chainId === 'loading') return; //Ignore 0xNaN, when user doesn't set chainId
    if (isHex(chainId)) handleChainChanged(hexToNumberString(chainId));
    else handleChainChanged(chainId);
};

//Patch networkChanged loading error
//@ts-expect-error
const handleNetworkChanged = injected.handleNetworkChanged;
//@ts-expect-error
injected.handleNetworkChanged = (networkId: string | number) => {
    // eslint-disable-next-line prettier/prettier
    console.debug('Handling \'networkChanged\' event with payload', networkId);
    if (networkId === '0xNaN' || networkId === 'loading') return; //Ignore loading, networkId as causes errors
    handleNetworkChanged(networkId);
};

export interface WalletInfo {
    connector?: AbstractConnector;
    name: string;
    iconName: string;
    description: string;
    href: string | null;
    color: string;
    primary?: true;
    mobile?: true;
    mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: 'metamask.png',
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D',
    },
};

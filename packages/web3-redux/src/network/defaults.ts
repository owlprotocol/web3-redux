import Web3 from 'web3';
import { Network } from './model/interface.js';
import {
    ETHERSCAN_API_KEY,
    GANACHE_RPC,
    MAINNET_RPC,
    ROPSTEN_RPC,
    RINKEBY_RPC,
    GOERLI_RPC,
    KOVAN_RPC,
    POLYGON_RPC,
    POLYGON_MUMBAI_RPC,
    ARBITRUM_RPC,
    ARBITRUM_RINKEBY_RPC,
    OPTIMISM_RPC,
    OPTIMISM_KOVAN_RPC,
    MAINNET_EXPLORER,
    MAINNET_EXPLORER_API,
    ROPSTEN_EXPLORER,
    ROPSTEN_EXPLORER_API,
    RINKEBY_EXPLORER,
    GOERLI_EXPLORER,
    GOERLI_EXPLORER_API,
    KOVAN_EXPLORER,
    KOVAN_EXPLORER_API,
    POLYGON_EXPLORER,
    POLYGON_EXPLORER_API,
    POLYGON_MUMBAI_EXPLORER,
    POLYGON_MUMBAI_EXPLORER_API,
    ARBITRUM_EXPLORER,
    ARBITRUM_EXPLORER_API,
} from '../environment.js';
import getWeb3Provider from '../test/getWeb3Provider.js';

const ETHER = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
};

const MATIC = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
};

export const defaultNetworks = () => {
    return {
        '1337': {
            networkId: '1337',
            name: 'ganache',
            currency: ETHER,
            web3Rpc: GANACHE_RPC(),
        },
        '1': {
            networkId: '1',
            name: 'Mainnet',
            currency: ETHER,
            web3Rpc: MAINNET_RPC(),
            explorerUrl: MAINNET_EXPLORER(),
            explorerApiUrl: MAINNET_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '3': {
            networkId: '3',
            name: 'Ropsten',
            currency: ETHER,
            web3Rpc: ROPSTEN_RPC(),
            explorerUrl: ROPSTEN_EXPLORER(),
            explorerApiUrl: ROPSTEN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '4': {
            networkId: '4',
            name: 'Rinkeby',
            currency: ETHER,
            web3Rpc: RINKEBY_RPC(),
            explorerUrl: RINKEBY_EXPLORER(),
            explorerApiUrl: ROPSTEN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '5': {
            networkId: '5',
            name: 'Goerli',
            web3Rpc: GOERLI_RPC(),
            explorerUrl: GOERLI_EXPLORER(),
            explorerApiUrl: GOERLI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '42': {
            networkId: '42',
            name: 'Kovan',
            currency: ETHER,
            web3Rpc: KOVAN_RPC(),
            explorerUrl: KOVAN_EXPLORER(),
            explorerApiUrl: KOVAN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '137': {
            networkId: '137',
            name: 'Polygon',
            currency: MATIC,
            web3Rpc: POLYGON_RPC(),
            explorerUrl: POLYGON_EXPLORER(),
            explorerApiUrl: POLYGON_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '80001': {
            networkId: '80001',
            name: 'Polygon Mumbai Testnet',
            currency: ETHER,
            web3Rpc: POLYGON_MUMBAI_RPC(),
            explorerUrl: POLYGON_MUMBAI_EXPLORER(),
            explorerApiUrl: POLYGON_MUMBAI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '42161': {
            networkId: '42161',
            name: 'Arbitrum One',
            currency: ETHER,
            web3Rpc: ARBITRUM_RPC(),
            explorerUrl: ARBITRUM_EXPLORER(),
            explorerApiUrl: ARBITRUM_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '421611': {
            networkId: '421611',
            name: 'Arbitrum Rinkeby',
            currency: ETHER,
            web3Rpc: ARBITRUM_RINKEBY_RPC(),
        },
        '10': {
            networkId: '10',
            name: 'Optimism',
            currency: ETHER,
            web3Rpc: OPTIMISM_RPC(),
        },
        '69': {
            networkId: '69',
            name: 'Optimism Kovan',
            currency: ETHER,
            web3Rpc: OPTIMISM_KOVAN_RPC(),
        },
    } as { [networkId: string]: Network | undefined };
};

export default defaultNetworks;

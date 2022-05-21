export const WalletContext = 'WALLET_CONTEXT';
export enum ChainId {
    MAINNET = '1',
    OPTIMISM = '10',
    ARBITRUM = '42161',
    POLYGON = '137',
    GANACHE = '1337'
}

export const SUPPORTED_CHAIN_IDS: ChainId[] = [ChainId.MAINNET, ChainId.OPTIMISM, ChainId.ARBITRUM, ChainId.POLYGON, ChainId.GANACHE];
export const DEFAULT_CHAIN_ID = SUPPORTED_CHAIN_IDS[0];
export const isSupportedNetworkId = (networkId: string) => {
    return SUPPORTED_CHAIN_IDS.includes(networkId as ChainId);
};

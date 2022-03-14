export const WalletContext = 'WALLET_CONTEXT';
export enum ChainId {
    MAINNET = '1',
    OPTIMISM = '10',
    ARBITRUM = '42161',
    POLYGON = '137',
}

export const SUPPORTED_CHAIN_IDS: ChainId[] = [ChainId.MAINNET, ChainId.OPTIMISM, ChainId.ARBITRUM, ChainId.POLYGON];
export const DEFAULT_CHAIN_ID = SUPPORTED_CHAIN_IDS[0];
export const isSupportedNetworkId = (networkId: string) => {
    return SUPPORTED_CHAIN_IDS.includes(networkId as ChainId);
};

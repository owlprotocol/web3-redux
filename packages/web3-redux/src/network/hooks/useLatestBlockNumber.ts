import useLatestBlock from './useLatestBlock.js';

/** @category Hooks */
export function useLatestBlockNumber(networkId: string | undefined) {
    const block = useLatestBlock(networkId);
    return block?.number;
}

export default useLatestBlockNumber;

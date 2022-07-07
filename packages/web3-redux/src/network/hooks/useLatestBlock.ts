import { useLiveQuery } from 'dexie-react-hooks';
import { BlockHeader } from '../../block/index.js';
import getDB from '../../db.js';

/** @category Hooks */
export function useLatestBlock(networkId: string | undefined) {
    const db = getDB();

    //https://dexie.org/docs/Compound-Index#using-with-orderby
    //TODO: Test
    return useLiveQuery(() => db.Block.where('networkId').equals(networkId).last() as BlockHeader | undefined);
}

export default useLatestBlock;

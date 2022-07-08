import { useLiveQuery } from 'dexie-react-hooks';
import getDB from '../../db.js';

/** @category Hooks */
export function useLatestBlock(networkId: string | undefined) {
    if (!networkId) return undefined;

    const db = getDB();
    //https://dexie.org/docs/Compound-Index#using-with-orderby
    //TODO: Test
    return useLiveQuery(() => db.Block.where('networkId').equals(networkId).last());
}

export default useLatestBlock;

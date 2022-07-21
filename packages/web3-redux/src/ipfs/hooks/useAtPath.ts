import { useLiveQuery } from 'dexie-react-hooks';
import getDB from '../../db.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export function useAtPath(path: string | undefined) {
    const db = getDB();

    return useLiveQuery(() => {
        if (!path) return undefined;
        return db.IPFSCache.where('paths').equals(path).first();
    }, [path]);
}

export default useAtPath;

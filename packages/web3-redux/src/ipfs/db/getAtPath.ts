import getDB from '../../db.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getAtPath(path: string | undefined) {
    if (!path) return undefined;

    const db = getDB();
    return db.IPFSCache.where('paths').equals(path).first();
}

export default getAtPath;

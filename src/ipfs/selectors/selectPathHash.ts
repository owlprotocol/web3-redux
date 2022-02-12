import selectByIdSingle from './selectByIdSingle';

/**
 * @category Selectors
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
function selectPathHash(state: any, path: string | undefined): string | undefined {
    if (!path) return undefined;

    // eslint-disable-next-line prefer-const
    let [cid, ...links] = path.split('/');
    for (const p of links) {
        const object = selectByIdSingle(state, cid);
        const link = (object?.linksByName ?? {})[p];
        const newCid = link?.Hash;
        if (!newCid) return undefined;
        cid = newCid.toString();
    }

    return cid;
}

export default selectPathHash;

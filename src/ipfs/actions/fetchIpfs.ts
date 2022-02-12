import { createAction } from '@reduxjs/toolkit';
import { isCIDGuard } from '../../utils';
import { name } from '../common';

/** @internal */
export const FETCH_IPFS = `${name}/FETCH_IPFS`;
/** @category Actions */
export const fetchIpfs = createAction(FETCH_IPFS, (payload: string) => {
    const [cid] = payload.split('/');
    isCIDGuard(cid);
    return { payload };
});
/** @internal */
export type FetchIpfsAction = ReturnType<typeof fetchIpfs>;
/** @internal */
export const isFetchIpfsAction = fetchIpfs.match;

export default fetchIpfs;

import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IpfsId } from '../model/interface';

/** @internal */
export const FETCH_IPFS = `${name}/FETCH_IPFS`;
/** @category Actions */
export const fetchIpfs = createAction(FETCH_IPFS, (payload: IpfsId) => {
    return { payload: { contentId: payload.contentId } };
});
/** @internal */
export type FetchIpfsAction = ReturnType<typeof fetchIpfs>;
/** @internal */
export const isFetchIpfsAction = fetchIpfs.match;

export default fetchIpfs;

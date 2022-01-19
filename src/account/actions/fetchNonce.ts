import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { AccountId } from '../model/interface';

/** @internal */
export const FETCH_NONCE = `${name}/FETCH_NONCE`;
/** @category Actions */
export const fetchNonce = createAction(FETCH_NONCE, (payload: AccountId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type FetchNonceAction = ReturnType<typeof fetchNonce>;
/** @internal */
export const isFetchNonceAction = fetchNonce.match;

export default fetchNonce;

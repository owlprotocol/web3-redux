import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IdArgs, getId } from '../model/interface';

export const FETCH_NONCE = `${name}/FETCH_NONCE`;
export const fetchNonce = createAction(FETCH_NONCE, (payload: IdArgs) => {
    return { payload: getId(payload) };
});

export type FetchNonceAction = ReturnType<typeof fetchNonce>;
export const isFetchNonceAction = fetchNonce.match;

export default fetchNonce;

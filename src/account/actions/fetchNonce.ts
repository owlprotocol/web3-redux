import { createAction } from '@reduxjs/toolkit';
import { Account } from '../model';
import { name } from './index';

export const FETCH_NONCE = `${name}/FETCH_NONCE`;
export const fetchNonce = createAction<Account>(FETCH_NONCE);

export type FetchNonceAction = ReturnType<typeof fetchNonce>;
export const isFetchNonceAction = fetchNonce.match;

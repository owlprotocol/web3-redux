import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';

export interface FetchTransactionOptions {
    startblock?: number;
    endblock?: number;
    page?: number;
    offset?: number;
    sort?: 'asc' | 'desc';
}

export interface FetchTransactionsPayload extends FetchTransactionOptions {
    networkId: string;
    address: string;
}

/** @internal */
export const FETCH_TRANSACTIONS = `${name}/FETCH_TRANSACTIONS`;
/** @category Actions */
export const fetchTransactions = createAction(FETCH_TRANSACTIONS, (payload: FetchTransactionsPayload) => {
    return { payload: { ...payload, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type FetchTransactionsAction = ReturnType<typeof fetchTransactions>;
/** @internal */
export const isFetchTransactionsAction = fetchTransactions.match;

export default fetchTransactions;

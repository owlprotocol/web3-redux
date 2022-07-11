import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';

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
export const fetchTransactions = createAction(
    FETCH_TRANSACTIONS,
    (payload: FetchTransactionsPayload, uuid?: string) => {
        return { payload: { ...payload, address: payload.address.toLowerCase() }, meta: uuid ?? uuidv4() };
    },
);
/** @internal */
export type FetchTransactionsAction = ReturnType<typeof fetchTransactions>;
/** @internal */
export const isFetchTransactionsAction = fetchTransactions.match;

export default fetchTransactions;

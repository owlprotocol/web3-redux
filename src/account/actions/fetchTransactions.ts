import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { AccountId } from '../model/interface';

/** @internal */
export const FETCH_TRANSACTIONS = `${name}/FETCH_TRANSACTIONS`;
/** @category Actions */
export const fetchTransactions = createAction(FETCH_TRANSACTIONS, (payload: AccountId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type FetchTransactionsAction = ReturnType<typeof fetchTransactions>;
/** @internal */
export const isFetchTransactionsAction = fetchTransactions.match;

export default fetchTransactions;

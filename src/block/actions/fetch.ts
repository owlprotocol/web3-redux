import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const FETCH = `${name}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
export interface FetchActionInput {
    networkId: string;
    /** The block number or block hash. Or the string "earliest", "latest" or "pending" */
    blockHashOrBlockNumber: string | number;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
export const fetch = createAction<FetchActionInput>(FETCH);

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

export default fetch;

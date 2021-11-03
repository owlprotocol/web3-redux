import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const SUBSCRIBE = `${name}/SUBSCRIBE`;

/** Subscribe to new block headers. Uses web3.eth.subscribe(). */
export interface SubscribeActionInput {
    networkId: string;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
export const subscribe = createAction<SubscribeActionInput>(SUBSCRIBE);
export type SubscribeAction = ReturnType<typeof subscribe>;
export const isSubscribeAction = subscribe.match;

export default subscribe;

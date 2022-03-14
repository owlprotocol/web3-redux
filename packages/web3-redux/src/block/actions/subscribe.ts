import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const SUBSCRIBE = `${name}/SUBSCRIBE`;

/** Subscribe to new block headers. Uses web3.eth.subscribe(). */
/** @internal */
export interface SubscribeActionInput {
    networkId: string;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
/** @category Actions */
export const subscribe = createAction<SubscribeActionInput>(SUBSCRIBE);
/** @internal */
export type SubscribeAction = ReturnType<typeof subscribe>;
/** @internal */
export const isSubscribeAction = subscribe.match;

export default subscribe;

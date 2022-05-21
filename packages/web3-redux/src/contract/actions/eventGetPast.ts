import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST = `${name}/EVENT_GET_PAST`;
/** @internal */
export interface EventGetPastActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock?: number | 'earliest';
    toBlock?: number | 'latest';
    blockBatch?: number;
    max?: number;
}
/** @category Actions */
export const eventGetPast = createAction(EVENT_GET_PAST, (payload: EventGetPastActionInput) => {
    let fromBlock: number;
    if (!payload.fromBlock || payload.fromBlock == 'earliest') {
        fromBlock = 0;
    } else {
        fromBlock = payload.fromBlock;
    }

    let toBlock: number | 'latest';
    if (!payload.toBlock || payload.toBlock === 'latest') {
        toBlock = 'latest';
    } else {
        toBlock = payload.toBlock;
    }

    const blockBatch = payload.blockBatch ?? 100; //100 block batch
    const max = payload.max ?? 100; //100 events max

    return { payload: { ...payload, fromBlock, toBlock, blockBatch, max } };
});
/** @internal */
export type EventGetPastAction = ReturnType<typeof eventGetPast>;
/** @internal */
export const isEventGetPastAction = eventGetPast.match;

export default eventGetPast;

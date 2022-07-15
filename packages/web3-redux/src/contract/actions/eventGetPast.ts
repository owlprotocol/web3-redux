import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
    blocks?: number;
    blockBatch?: number;
}
/** @category Actions */
export const eventGetPast = createAction(EVENT_GET_PAST, (payload: EventGetPastActionInput, uuid?: string) => {
    let fromBlock: number | undefined;
    if (payload.fromBlock == 'earliest') {
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

    const blockBatch = payload.blockBatch ?? 1000;

    return {
        payload: { ...payload, fromBlock, toBlock, blocks: payload.blocks, blockBatch },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type EventGetPastAction = ReturnType<typeof eventGetPast>;
/** @internal */
export const isEventGetPastAction = eventGetPast.match;

export default eventGetPast;

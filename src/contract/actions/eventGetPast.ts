import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const EVENT_GET_PAST = `${name}/EVENT_GET_PAST`;
export interface EventGetPastActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock?: number | 'earliest';
    toBlock?: number | 'latest';
    blockBatch?: number;
}
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

    const blockBatch = payload.blockBatch ?? 100;

    return { payload: { ...payload, fromBlock, toBlock, blockBatch } };
});

export type EventGetPastAction = ReturnType<typeof eventGetPast>;
export const isEventGetPastAction = eventGetPast.match;

export default eventGetPast;

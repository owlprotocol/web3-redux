import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST_RAW = `${name}/EVENT_GET_PAST_RAW`;
/** @internal */
export interface EventGetPastRawActionInput {
    id?: string;
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock: number;
    toBlock: number;
    max?: number;
}
/** @category Actions */
export const eventGetPastRaw = createAction(EVENT_GET_PAST_RAW, (payload: EventGetPastRawActionInput) => {
    const { networkId, address, eventName, filter, fromBlock, toBlock, max } = payload;
    const addressChecksum = address.toLowerCase();

    //cache id for eventGetPast action
    const eventIndex = { networkId, address: addressChecksum, name: eventName, filter, fromBlock, toBlock };
    const id = JSON.stringify(eventIndex);
    return {
        payload: {
            id,
            networkId,
            address: addressChecksum,
            eventName,
            filter,
            fromBlock,
            toBlock,
            max,
        },
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type EventGetPastRawAction = ReturnType<typeof eventGetPastRaw>;
/** @internal */
export const isEventGetPastRawAction = eventGetPastRaw.match;

export default eventGetPastRaw;

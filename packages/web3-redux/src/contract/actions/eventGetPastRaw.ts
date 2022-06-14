import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST_RAW = `${name}/EVENT_GET_PAST_RAW`;
/** @internal */
export interface EventGetPastRawActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock: number;
    toBlock: number;
    max: number;
}
/** @category Actions */
export const eventGetPastRaw = createAction(EVENT_GET_PAST_RAW, (payload: EventGetPastRawActionInput) => {
    return {
        payload: { ...payload },
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

import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const EVENT_UNSUBSCRIBE = `${name}/EVENT_UNSUBSCRIBE`;
/** @internal */
export interface EventUnsubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
/** @category Actions */
export const eventUnsubscribe = createAction(
    EVENT_UNSUBSCRIBE,
    (payload: EventUnsubscribeActionInput, uuid?: string) => {
        return {
            payload,
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type EventUnsubscribeAction = ReturnType<typeof eventUnsubscribe>;
/** @internal */
export const isEventUnsubscribeAction = eventUnsubscribe.match;

export default eventUnsubscribe;

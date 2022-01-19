import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

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
export const eventUnsubscribe = createAction<EventUnsubscribeActionInput>(EVENT_UNSUBSCRIBE);
/** @internal */
export type EventUnsubscribeAction = ReturnType<typeof eventUnsubscribe>;
/** @internal */
export const isEventUnsubscribeAction = eventUnsubscribe.match;

export default eventUnsubscribe;

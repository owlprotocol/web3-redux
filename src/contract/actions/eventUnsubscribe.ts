import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const EVENT_UNSUBSCRIBE = `${name}/EVENT_UNSUBSCRIBE`;
export interface EventUnsubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export const eventUnsubscribe = createAction<EventUnsubscribeActionInput>(EVENT_UNSUBSCRIBE);

export type EventUnsubscribeAction = ReturnType<typeof eventUnsubscribe>;
export const isEventUnsubscribeAction = eventUnsubscribe.match;

export default eventUnsubscribe;

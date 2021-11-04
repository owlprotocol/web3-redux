import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const EVENT_SUBSCRIBE = `${name}/EVENT_SUBSCRIBE`;
export interface EventSubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export const eventSubscribe = createAction<EventSubscribeActionInput>(EVENT_SUBSCRIBE);

export type EventSubscribeAction = ReturnType<typeof eventSubscribe>;
export const isEventSubscribeAction = eventSubscribe.match;

export default eventSubscribe;

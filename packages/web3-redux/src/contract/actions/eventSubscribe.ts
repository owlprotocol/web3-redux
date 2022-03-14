import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const EVENT_SUBSCRIBE = `${name}/EVENT_SUBSCRIBE`;
/** @internal */
export interface EventSubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
/** @category Actions */
export const eventSubscribe = createAction<EventSubscribeActionInput>(EVENT_SUBSCRIBE);
/** @internal */
export type EventSubscribeAction = ReturnType<typeof eventSubscribe>;
/** @internal */
export const isEventSubscribeAction = eventSubscribe.match;

export default eventSubscribe;

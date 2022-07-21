import { createAction } from '../../utils/createAction.js';
import { v4 as uuidv4 } from 'uuid';
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
export const eventSubscribe = createAction(EVENT_SUBSCRIBE, (payload: EventSubscribeActionInput, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type EventSubscribeAction = ReturnType<typeof eventSubscribe>;
/** @internal */
export const isEventSubscribeAction = eventSubscribe.match;

export default eventSubscribe;

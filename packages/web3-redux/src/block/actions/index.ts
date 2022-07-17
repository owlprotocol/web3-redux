import { FETCH, fetchAction, FetchAction, isFetchAction } from './fetch.js';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe.js';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe.js';

/** @internal */
export type SagaAction = FetchAction | SubscribeAction | UnsubscribeAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action) || isSagaAction(action) || isUnsubscribeAction(action);
}

export type { FetchAction, SubscribeAction, UnsubscribeAction };

export {
    FETCH,
    fetchAction as fetch,
    isFetchAction,
    SUBSCRIBE,
    subscribe,
    isSubscribeAction,
    UNSUBSCRIBE,
    unsubscribe,
    isUnsubscribeAction,
};

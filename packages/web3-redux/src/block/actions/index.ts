import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe.js';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe.js';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type SagaAction = FetchAction | SubscribeAction | UnsubscribeAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action) || isSagaAction(action) || isUnsubscribeAction(action);
}

/** @internal */
export type Action = ReducerAction | SagaAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export type { CreateAction, RemoveAction, UpdateAction, SetAction, FetchAction };

export {
    CREATE,
    create,
    isCreateAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
    SET,
    set,
    isSetAction,
    FETCH,
    fetch,
    isFetchAction,
    SUBSCRIBE,
    subscribe,
    isSubscribeAction,
    UNSUBSCRIBE,
    unsubscribe,
    isUnsubscribeAction,
};

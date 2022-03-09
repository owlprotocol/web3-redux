import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe';

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

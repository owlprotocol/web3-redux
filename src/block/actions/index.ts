import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe';

export type ReducerAction = CreateAction | RemoveAction | UpdateAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action);
}

export type SagaAction = FetchAction | SubscribeAction | UnsubscribeAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action) || isSagaAction(action) || isUnsubscribeAction(action);
}

export type Action = ReducerAction | SagaAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export {
    CREATE,
    create,
    CreateAction,
    isCreateAction,
    REMOVE,
    remove,
    RemoveAction,
    isRemoveAction,
    UPDATE,
    update,
    UpdateAction,
    isUpdateAction,
    FETCH,
    fetch,
    FetchAction,
    isFetchAction,
    SUBSCRIBE,
    subscribe,
    SubscribeAction,
    isSubscribeAction,
    UNSUBSCRIBE,
    unsubscribe,
    UnsubscribeAction,
    isUnsubscribeAction,
};

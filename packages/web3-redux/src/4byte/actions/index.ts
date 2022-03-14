import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import {
    FETCH_EVENT_SIGNATURE,
    fetchEventSignature,
    FetchEventSignatureAction,
    isFetchEventSignatureAction,
} from './fetchEventSignature.js';

import {
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    FetchFunctionSignatureAction,
    isFetchFunctionSignatureAction,
} from './fetchFunctionSignature.js';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type SagaAction = FetchEventSignatureAction | FetchFunctionSignatureAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchEventSignatureAction(action) || isFetchFunctionSignatureAction(action);
}

/** @internal */
export type Action = ReducerAction | SagaAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export type {
    CreateAction,
    RemoveAction,
    UpdateAction,
    SetAction,
    FetchEventSignatureAction,
    FetchFunctionSignatureAction,
};

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
    FETCH_EVENT_SIGNATURE,
    fetchEventSignature,
    isFetchEventSignatureAction,
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    isFetchFunctionSignatureAction,
};

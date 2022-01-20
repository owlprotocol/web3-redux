import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import {
    FETCH_EVENT_SIGNATURE,
    fetchEventSignature,
    FetchEventSignatureAction,
    isFetchEventSignatureAction,
} from './fetchEventSignature';
import {
    FETCH_EVENT_SIGNATURE_SYNCED,
    fetchEventSignatureSynced,
    FetchEventSignatureSyncedAction,
    isFetchEventSignatureSyncedAction,
} from './fetchEventSignatureSynced';
import {
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    FetchFunctionSignatureAction,
    isFetchFunctionSignatureAction,
} from './fetchFunctionSignature';
import {
    FETCH_FUNCTION_SIGNATURE_SYNCED,
    fetchFunctionSignatureSynced,
    FetchFunctionSignatureSyncedAction,
    isFetchFunctionSignatureSyncedAction,
} from './fetchFunctionSignatureSynced';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type SagaAction =
    | FetchEventSignatureAction
    | FetchEventSignatureSyncedAction
    | FetchFunctionSignatureAction
    | FetchFunctionSignatureSyncedAction;

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
    FetchEventSignatureSyncedAction,
    FetchFunctionSignatureAction,
    FetchFunctionSignatureSyncedAction,
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
    FETCH_EVENT_SIGNATURE_SYNCED,
    fetchEventSignatureSynced,
    isFetchEventSignatureSyncedAction,
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    isFetchFunctionSignatureAction,
    FETCH_FUNCTION_SIGNATURE_SYNCED,
    fetchFunctionSignatureSynced,
    isFetchFunctionSignatureSyncedAction,
};

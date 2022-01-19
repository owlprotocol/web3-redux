import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { FETCH_BALANCE, fetchBalance, FetchBalanceAction, isFetchBalanceAction } from './fetchBalance';
import { FETCH_NONCE, fetchNonce, FetchNonceAction, isFetchNonceAction } from './fetchNonce';
import {
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    FetchBalanceSyncedAction,
    isFetchBalanceSyncedAction,
} from './fetchBalanceSynced';
import {
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    FetchNonceSyncedAction,
    isFetchNonceSyncedAction,
} from './fetchNonceSynced';
import { GET_CODE, getCode, GetCodeAction, isGetCodeAction } from './getCode';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type SagaAction =
    | FetchBalanceAction
    | FetchNonceAction
    | FetchBalanceSyncedAction
    | FetchNonceSyncedAction
    | GetCodeAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isFetchBalanceAction(action) ||
        isFetchNonceAction(action) ||
        isFetchBalanceSyncedAction(action) ||
        isFetchNonceSyncedAction(action) ||
        isGetCodeAction(action)
    );
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
    FetchBalanceAction,
    FetchNonceAction,
    FetchBalanceSyncedAction,
    FetchNonceSyncedAction,
    GetCodeAction,
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
    FETCH_BALANCE,
    fetchBalance,
    isFetchBalanceAction,
    FETCH_NONCE,
    fetchNonce,
    isFetchNonceAction,
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    isFetchBalanceSyncedAction,
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    isFetchNonceSyncedAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
};

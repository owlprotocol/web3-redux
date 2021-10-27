import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
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

export type ReducerAction = CreateAction | RemoveAction | UpdateAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action);
}

export type SagaAction = FetchBalanceAction | FetchNonceAction | FetchBalanceSyncedAction | FetchNonceSyncedAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isFetchBalanceAction(action) ||
        isFetchNonceAction(action) ||
        isFetchBalanceSyncedAction(action) ||
        isFetchNonceSyncedAction(action)
    );
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
    FETCH_BALANCE,
    fetchBalance,
    FetchBalanceAction,
    isFetchBalanceAction,
    FETCH_NONCE,
    fetchNonce,
    FetchNonceAction,
    isFetchNonceAction,
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    FetchBalanceSyncedAction,
    isFetchBalanceSyncedAction,
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    FetchNonceSyncedAction,
    isFetchNonceSyncedAction,
};

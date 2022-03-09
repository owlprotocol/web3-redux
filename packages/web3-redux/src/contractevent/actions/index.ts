import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { GET_PAST_LOGS, getPastLogs, GetPastLogsAction, isGetPastLogsAction } from './getPastLogs';
import { SUBSCRIBE_LOGS, subscribeLogs, SubscribeLogsAction, isSubscribeLogsAction } from './subscribeLogs';
import { UNSUBSCRIBE_LOGS, unsubscribeLogs, UnsubscribeLogsAction, isUnsubscribeLogsAction } from './unsubscribeLogs';
import { GET_ASSETS, getAssets, GetAssetsAction, isGetAssetsAction } from './getAssets';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type Action = ReducerAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export type {
    CreateAction,
    RemoveAction,
    UpdateAction,
    SetAction,
    GetPastLogsAction,
    SubscribeLogsAction,
    UnsubscribeLogsAction,
    GetAssetsAction,
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
    GET_PAST_LOGS,
    getPastLogs,
    isGetPastLogsAction,
    SUBSCRIBE_LOGS,
    subscribeLogs,
    isSubscribeLogsAction,
    UNSUBSCRIBE_LOGS,
    unsubscribeLogs,
    isUnsubscribeLogsAction,
    GET_ASSETS,
    getAssets,
    isGetAssetsAction,
};

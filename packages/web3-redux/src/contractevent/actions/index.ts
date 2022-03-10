import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { GET_PAST_LOGS, getPastLogs, GetPastLogsAction, isGetPastLogsAction } from './getPastLogs.js';
import { SUBSCRIBE_LOGS, subscribeLogs, SubscribeLogsAction, isSubscribeLogsAction } from './subscribeLogs.js';
import { UNSUBSCRIBE_LOGS, unsubscribeLogs, UnsubscribeLogsAction, isUnsubscribeLogsAction } from './unsubscribeLogs.js';
import { GET_ASSETS, getAssets, GetAssetsAction, isGetAssetsAction } from './getAssets.js';

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

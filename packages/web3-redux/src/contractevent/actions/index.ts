import { GET_PAST_LOGS, getPastLogs, GetPastLogsAction, isGetPastLogsAction } from './getPastLogs.js';
import { SUBSCRIBE_LOGS, subscribeLogs, SubscribeLogsAction, isSubscribeLogsAction } from './subscribeLogs.js';
import {
    UNSUBSCRIBE_LOGS,
    unsubscribeLogs,
    UnsubscribeLogsAction,
    isUnsubscribeLogsAction,
} from './unsubscribeLogs.js';
import { GET_ASSETS, getAssets, GetAssetsAction, isGetAssetsAction } from './getAssets.js';

/** @internal */
export type SagaAction = GetPastLogsAction | SubscribeLogsAction | UnsubscribeLogsAction | GetAssetsAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isGetPastLogsAction(action) ||
        isSubscribeLogsAction(action) ||
        isUnsubscribeLogsAction(action) ||
        isGetAssetsAction(action)
    );
}

export type { GetPastLogsAction, SubscribeLogsAction, UnsubscribeLogsAction, GetAssetsAction };

export {
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

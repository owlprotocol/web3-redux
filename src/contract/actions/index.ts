import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { CALL, call, CallAction, isCallAction } from './call';
import { CALL_BATCHED, callBatched, CallBatchedAction, isCallBatchedAction } from './callBatched';
import { CALL_SYNCED, callSynced, CallSyncedAction, isCallSyncedAction } from './callSynced';
import { CALL_UNSYNC, callUnsync, CallUnsyncAction, isCallUnsyncAction } from './callUnsync';
import { SEND, send, SendAction, isSendAction } from './send';
import { EVENT_GET_PAST, eventGetPast, EventGetPastAction, isEventGetPastAction } from './eventGetPast';
import { EVENT_SUBSCRIBE, eventSubscribe, EventSubscribeAction, isEventSubscribeAction } from './eventSubscribe';
import {
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    EventUnsubscribeAction,
    isEventUnsubscribeAction,
} from './eventUnsubscribe';

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type SagaAction =
    | CallAction
    | CallBatchedAction
    | CallSyncedAction
    | CallUnsyncAction
    | SendAction
    | EventGetPastAction
    | EventSubscribeAction
    | EventUnsubscribeAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCallAction(action) ||
        isCallBatchedAction(action) ||
        isCallSyncedAction(action) ||
        isCallUnsyncAction(action) ||
        isSendAction(action) ||
        isEventGetPastAction(action) ||
        isEventSubscribeAction(action) ||
        isEventUnsubscribeAction(action)
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
    CALL,
    call,
    CallAction,
    isCallAction,
    CALL_SYNCED,
    callSynced,
    CallSyncedAction,
    isCallSyncedAction,
    CALL_UNSYNC,
    callUnsync,
    CallUnsyncAction,
    isCallUnsyncAction,
    CALL_BATCHED,
    callBatched,
    CallBatchedAction,
    isCallBatchedAction,
    SEND,
    send,
    SendAction,
    isSendAction,
    EVENT_GET_PAST,
    eventGetPast,
    EventGetPastAction,
    isEventGetPastAction,
    EVENT_SUBSCRIBE,
    eventSubscribe,
    EventSubscribeAction,
    isEventSubscribeAction,
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    EventUnsubscribeAction,
    isEventUnsubscribeAction,
};

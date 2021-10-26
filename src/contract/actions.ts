import { createAction } from '@reduxjs/toolkit';
import { ZERO_ADDRESS } from '../utils';
import {
    ContractCallSync,
    ContractId,
    CALL_BLOCK_SYNC,
    CALL_TRANSACTION_SYNC,
    ContractPartial,
    defaultTransactionSyncForContract,
    defaultBlockSync,
} from './model';

const name = 'Contract';

export const CREATE = `${name}/CREATE`;
export const UPDATE = `${name}/UPDATE`;
export const REMOVE = `${name}/DELETE`;

export const CALL = `${name}/CALL`;
export const CALL_BATCHED = `${name}/CALL_BATCHED`;
export const CALL_SYNCED = `${name}/CALL_SYNCED`;
export const CALL_UNSYNC = `${name}/CALL_UNSYNC`;
export const SEND = `${name}/SEND`;

export const EVENT_GET_PAST = `${name}/EVENT_GET_PAST`;
export const EVENT_SUBSCRIBE = `${name}/EVENT_SUBSCRIBE`;
export const EVENT_UNSUBSCRIBE = `${name}/EVENT_UNSUBSCRIBE`;

export const create = createAction<ContractPartial>(CREATE);
export const remove = createAction<ContractId>(REMOVE);

export interface CallActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from?: string;
    defaultBlock?: number | string;
    gas?: string;
}
export const call = createAction<CallActionInput>(CALL);

export interface CallBatchedActionInput {
    networkId: string;
    requests: {
        address: string;
        method: string;
        args?: any[];
        from?: string;
        defaultBlock?: number | string;
        gas?: string;
    }[];
}
/**
 * Optimally batched call requests.
 * Requests are grouped by network and batched with web3.BatchRequest().
 * @see {@link https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#batchrequest}
 *
 * Calls will be batched busing Multicall if:
 *  - network has a Multicall contract
 *  - from == undefined
 *  - defaultBlock == 'latest' || defaultBlock == undefined
 * @see {@link https://github.com/makerdao/multicall}
 */
export const callBatched = createAction<CallBatchedActionInput>(CALL_BATCHED);

export interface CallSyncedActionInput extends CallActionInput {
    sync?: ContractCallSync | boolean | typeof CALL_BLOCK_SYNC | typeof CALL_TRANSACTION_SYNC;
}
export const callSynced = createAction(CALL_SYNCED, (payload: CallSyncedActionInput) => {
    //Defaults
    const from: string = payload.from ?? ZERO_ADDRESS;
    const defaultBlock = payload.defaultBlock ?? 'latest';

    let sync: ContractCallSync | false;
    const defaultTransactionSync = defaultTransactionSyncForContract(payload.address);

    if (defaultBlock === 'latest') {
        if (payload.sync === false) {
            sync = false;
        } else if (payload.sync === true) {
            sync = defaultTransactionSync;
        } else if (!payload.sync) {
            sync = defaultTransactionSync;
        } else if (payload.sync === CALL_TRANSACTION_SYNC) {
            sync = defaultTransactionSync;
        } else if (payload.sync === CALL_BLOCK_SYNC) {
            sync = defaultBlockSync;
        } else {
            sync = payload.sync as ContractCallSync;
        }
    } else {
        sync = false;
    }

    return { payload: { ...payload, from, defaultBlock, sync } };
});

export const callUnsync = createAction<CallActionInput>(CALL_UNSYNC);
export interface SendActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from: string;
    gasPrice?: string;
    gas?: string;
    value?: string;
}
export const send = createAction<SendActionInput>(SEND);

export interface EventGetPastActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock?: number | string;
    toBlock?: number | string;
    blockBatch?: number;
}

export const eventGetPast = createAction(EVENT_GET_PAST, (payload: EventGetPastActionInput) => {
    let fromBlock: number;
    if (!payload.fromBlock || payload.fromBlock == 'earliest') {
        fromBlock = 0;
    } else if (typeof payload.fromBlock === 'string') {
        fromBlock = parseInt(payload.fromBlock);
    } else {
        fromBlock = payload.fromBlock;
    }

    let toBlock: number | string;
    if (!payload.toBlock || payload.toBlock === 'latest') {
        toBlock = 'latest';
    } else if (typeof payload.toBlock === 'string') {
        toBlock = parseInt(payload.toBlock);
    } else {
        toBlock = payload.toBlock;
    }

    const blockBatch = payload.blockBatch ?? 100;

    return { payload: { ...payload, fromBlock, toBlock, blockBatch } };
});

export interface EventSubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock?: number | string;
}
export const eventSubscribe = createAction<EventSubscribeActionInput>(EVENT_SUBSCRIBE);

export interface EventUnsubscribeActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export const eventUnsubscribe = createAction<EventUnsubscribeActionInput>(EVENT_UNSUBSCRIBE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type CallAction = ReturnType<typeof call>;
export const isCallAction = call.match;

export type CallBatchedAction = ReturnType<typeof callBatched>;
export const isCallBatchedAction = callBatched.match;

export type CallSyncedAction = ReturnType<typeof callSynced>;
export const isCallSyncedAction = callSynced.match;

export type CallUnsyncAction = ReturnType<typeof callUnsync>;
export const isCallUnsyncAction = callUnsync.match;

export type SendAction = ReturnType<typeof send>;
export const isSendAction = send.match;

export type EventGetPastAction = ReturnType<typeof eventGetPast>;
export const isEventGetPastAction = eventGetPast.match;

export type EventSubscribeAction = ReturnType<typeof eventSubscribe>;
export const isEventSubscribeAction = eventSubscribe.match;

export type EventUnsubscribeAction = ReturnType<typeof eventUnsubscribe>;
export const isEventUnsubscribeAction = eventUnsubscribe.match;

export type ReducerAction = CreateAction | RemoveAction | CallUnsyncAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isCallUnsyncAction(action);
}

export type SagaAction =
    | CallAction
    | CallBatchedAction
    | CallSyncedAction
    | SendAction
    | EventGetPastAction
    | EventSubscribeAction
    | EventUnsubscribeAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCallAction(action) ||
        isCallBatchedAction(action) ||
        isCallSyncedAction(action) ||
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

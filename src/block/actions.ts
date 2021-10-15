import { createAction } from '@reduxjs/toolkit';
import { Block, blockId, BlockId, validatedBlock } from './model';

const name = 'Block';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;
export const FETCH = `${name}/FETCH`;
export const SUBSCRIBE = `${name}/SUBSCRIBE`;
export const UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;

export const create = createAction(CREATE, (block: Block) => {
    return { payload: validatedBlock(block) };
});
export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export const remove = createAction(REMOVE, (data: BlockId) => {
    return { payload: { ...data, id: blockId(data) } };
});
export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

/** Block fetch action.  Uses web3.eth.getBlock(). */
export interface FetchActionInput {
    networkId: string;
    /** The block number or block hash. Or the string "earliest", "latest" or "pending" */
    blockHashOrBlockNumber: string | number;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
export const fetch = createAction<FetchActionInput>(FETCH);
export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

/** Subscribe to new block headers. Uses web3.eth.subscribe(). */
export interface SubscribeActionInput {
    networkId: string;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
export const subscribe = createAction<SubscribeActionInput>(SUBSCRIBE);
export type SubscribeAction = ReturnType<typeof subscribe>;
export const isSubscribeAction = subscribe.match;

export const unsubscribe = createAction<string>(UNSUBSCRIBE);
export type UnsubscribeAction = ReturnType<typeof unsubscribe>;
export const isUnsubscribeAction = unsubscribe.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type SagaAction = FetchAction | SubscribeAction | UnsubscribeAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action) || isSubscribeAction(action) || isUnsubscribeAction(action);
}

export type Action = ReducerAction | SagaAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

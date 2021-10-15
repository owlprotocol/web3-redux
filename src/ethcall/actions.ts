import { NetworkId } from '../network/model';
import { createAction } from '@reduxjs/toolkit';
import { PartialEthCall, validatedEthCall } from './model';

const name = 'EthCall';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;
export const FETCH = `${name}/FETCH`;

export const create = createAction(CREATE, (ethCall: PartialEthCall) => {
    return { payload: validatedEthCall(ethCall) };
});
export const remove = createAction(REMOVE, (ethCallOrId: string | PartialEthCall) => {
    if (typeof ethCallOrId === 'string') {
        return { payload: ethCallOrId };
    }
    return { payload: validatedEthCall(ethCallOrId).id };
});

export interface FetchActionInput extends NetworkId {
    from?: string; //default to ZERO_ADDRESS
    to: string;
    defaultBlock?: string; //default to latest
    data: string;
    gas?: string;
}
export const fetch = createAction<FetchActionInput>(FETCH);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type SagaAction = FetchAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action);
}

export type Action = ReducerAction | SagaAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

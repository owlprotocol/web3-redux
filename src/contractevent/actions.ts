import { createAction } from '@reduxjs/toolkit';
import { PartialContractEvent, validatedContractEvent } from './model';

const name = 'ContractEvent';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;

export const create = createAction(CREATE, (ContractEvent: PartialContractEvent) => {
    return { payload: validatedContractEvent(ContractEvent) };
});
export const remove = createAction(REMOVE, (ContractEventOrId: string | PartialContractEvent) => {
    if (typeof ContractEventOrId === 'string') {
        return { payload: ContractEventOrId };
    }
    return { payload: validatedContractEvent(ContractEventOrId).id };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

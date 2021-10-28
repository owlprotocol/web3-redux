import { createAction } from '@reduxjs/toolkit';
import { EthCall, validatedEthCall } from '../model';
import { name } from './common';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction(REMOVE, (payload: EthCall) => {
    return { payload: validatedEthCall(payload).id };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

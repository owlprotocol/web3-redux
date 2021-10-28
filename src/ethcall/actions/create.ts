import { createAction } from '@reduxjs/toolkit';
import { EthCall, validatedEthCall } from '../model';
import { name } from './common';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (payload: EthCall) => {
    return { payload: validatedEthCall(payload) };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

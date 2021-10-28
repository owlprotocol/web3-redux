import { createAction } from '@reduxjs/toolkit';
import { EthCall, validatedEthCall } from '../model';
import { name } from './common';

export const UPDATE = `${name}/UPDATE`;
export const update = createAction(UPDATE, (payload: EthCall) => {
    return { payload: validatedEthCall(payload) };
});

export type UpdateAction = ReturnType<typeof update>;
export const isUpdateAction = update.match;

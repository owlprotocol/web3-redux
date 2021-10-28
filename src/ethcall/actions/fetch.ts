import { createAction } from '@reduxjs/toolkit';
import { validatedEthCall } from '../model';
import { EthCall } from '../model';
import { name } from './common';

export const FETCH = `${name}/FETCH`;
export const fetch = createAction(FETCH, (payload: EthCall) => {
    return { payload: validatedEthCall(payload) };
});

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

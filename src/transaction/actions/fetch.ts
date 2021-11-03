import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Interface, validate } from '../model/interface';

export const FETCH = `${name}/FETCH`;
export const fetch = createAction(FETCH, (payload: Interface) => {
    return { payload: validate(payload) };
});

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

export default fetch;

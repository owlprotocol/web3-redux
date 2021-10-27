import { createAction } from '@reduxjs/toolkit';
import { EthCall } from '../model';
import { name } from './common';

export const FETCH = `${name}/FETCH`;
export const fetch = createAction<EthCall>(FETCH);

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

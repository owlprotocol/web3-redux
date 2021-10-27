import { createAction } from '@reduxjs/toolkit';
import { EthCall } from '../model';
import { name } from './common';

export const UPDATE = `${name}/UPDATE`;
export const update = createAction<EthCall>(UPDATE);

export type UpdateAction = ReturnType<typeof update>;
export const isUpdateAction = update.match;

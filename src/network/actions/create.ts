import { createAction } from '@reduxjs/toolkit';
import { Network } from '../model';
import { name } from './common';

export const CREATE = `${name}/CREATE`;
export const create = createAction<Network>(CREATE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

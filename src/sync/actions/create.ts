import { createAction } from '@reduxjs/toolkit';
import { Sync } from '../model';
import { name } from './common';

export const CREATE = `${name}/CREATE`;
export const create = createAction<Sync>(CREATE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export default create;

import { createAction } from '@reduxjs/toolkit';
import { ContractPartial } from '../model';
import { name } from './common';

export const CREATE = `${name}/CREATE`;
export const create = createAction<ContractPartial>(CREATE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

import { createAction } from '@reduxjs/toolkit';
import { ContractId } from '../model';
import { name } from './common';

export const REMOVE = `${name}/REMOVE`;
export const remove = createAction<ContractId>(REMOVE);

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

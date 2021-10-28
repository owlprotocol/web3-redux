import { createAction } from '@reduxjs/toolkit';
import { name } from './common';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction<string>(REMOVE);

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

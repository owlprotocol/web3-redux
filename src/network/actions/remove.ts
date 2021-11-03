import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Id } from '../model/interface';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction(REMOVE, (payload: Id) => {
    return { payload };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export default remove;

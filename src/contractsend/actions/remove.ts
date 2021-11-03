import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IdArgs, getId } from '../model/interface';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction(REMOVE, (payload: IdArgs) => {
    return { payload: getId(payload) };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export default remove;

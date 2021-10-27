import { createAction } from '@reduxjs/toolkit';
import { BlockId, blockId } from '../model';
import { name } from './common';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction(REMOVE, (data: BlockId) => {
    return { payload: blockId(data) };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

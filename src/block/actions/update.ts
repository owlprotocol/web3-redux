import { createAction } from '@reduxjs/toolkit';
import { Block, validatedBlock } from '../model';
import { name } from './common';

export const UPDATE = `${name}/UPDATE`;
export const update = createAction(UPDATE, (payload: Block) => {
    return { payload: validatedBlock(payload) };
});

export type UpdateAction = ReturnType<typeof update>;
export const isUpdateAction = update.match;

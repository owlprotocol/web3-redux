import { createAction } from '@reduxjs/toolkit';
import { Block, validatedBlock } from '../model';
import { name } from './common';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (payload: Block) => {
    return { payload: validatedBlock(payload) };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Http } from '../model/interface.js';

export const CREATE_BATCHED = `${name}/CREATE_BATCHED`;
export const createBatchedAction = createAction(CREATE_BATCHED, (payload: Http[], uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateBatchedAction = ReturnType<typeof createBatchedAction>;
export const isCreateBatchedAction = createBatchedAction.match;

export default createBatchedAction;

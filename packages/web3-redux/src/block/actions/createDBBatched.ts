import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { BlockHeader, validate } from '../model/index.js';

export const CREATE_DB_BATCHED = `${name}/CREATE_DB_BATCHED`;
export const createDBBatchedAction = createAction(CREATE_DB_BATCHED, (payload: BlockHeader[], uuid?: string) => {
    return {
        payload: payload.map(validate),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBBatchedAction = ReturnType<typeof createDBBatchedAction>;
export const isCreateDBBatchedAction = createDBBatchedAction.match;

export default createDBBatchedAction;

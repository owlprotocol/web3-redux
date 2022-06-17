import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Http } from '../model/interface.js';

export const CREATE_DB_BATCHED = `${name}/CREATE_DB_BATCHED`;
export const createDBBatchedAction = createAction(CREATE_DB_BATCHED, (payload: Http[], uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBBatchedAction = ReturnType<typeof createDBBatchedAction>;
export const isCreateDBBatchedAction = createDBBatchedAction.match;

export default createDBBatchedAction;

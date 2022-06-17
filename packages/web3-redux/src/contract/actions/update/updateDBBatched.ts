import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Contract, validate } from '../../model/index.js';

export const UPDATE_DB_BATCHED = `${name}/update_DB_BATCHED`;
export const updateDBBatchedAction = createAction(UPDATE_DB_BATCHED, (payload: Contract[], uuid?: string) => {
    return {
        payload: payload.map(validate),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type UpdateDBBatchedAction = ReturnType<typeof updateDBBatchedAction>;
export const isUpdateDBBatchedAction = updateDBBatchedAction.match;

export default UpdateDBBatchedAction;

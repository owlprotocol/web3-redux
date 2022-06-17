import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Transaction, validate } from '../../model/index.js';

export const UPDATE_DB = `${name}/update_DB`;
export const updateDBAction = createAction(UPDATE_DB, (payload: Transaction, uuid?: string) => {
    return {
        payload: validate(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type UpdateDBAction = ReturnType<typeof updateDBAction>;
export const isUpdateDBAction = updateDBAction.match;

export default UpdateDBAction;

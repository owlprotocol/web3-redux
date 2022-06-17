import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Ipfs } from '../../model/index.js';

export const CREATE_DB = `${name}/CREATE_DB`;
export const createDBAction = createAction(CREATE_DB, (payload: Ipfs, uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBAction = ReturnType<typeof createDBAction>;
export const isCreateDBAction = createDBAction.match;

export default createDBAction;

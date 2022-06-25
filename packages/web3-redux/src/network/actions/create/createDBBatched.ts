import { createAction } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Network, validate } from '../../model/index.js';

export const CREATE_DB_BATCHED = `${name}/CREATE_DB_BATCHED`;
export const createDBBatchedAction = createAction(CREATE_DB_BATCHED, (payload: Network[], uuid?: string) => {
    return {
        payload: payload
            .map(validate)
            .map((p) => omit(p, ['web3', 'web3Sender', 'multicallContract', 'explorerApiClient'])),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBBatchedAction = ReturnType<typeof createDBBatchedAction>;
export const isCreateDBBatchedAction = createDBBatchedAction.match;

export default createDBBatchedAction;

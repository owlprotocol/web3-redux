import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { omit } from '../../../utils/lodash/index.js';
import { name } from '../../common.js';
import { Network, validate } from '../../model/index.js';

export const UPDATE_DB_BATCHED = `${name}/update_DB_BATCHED`;
export const updateDBBatchedAction = createAction(UPDATE_DB_BATCHED, (payload: Network[], uuid?: string) => {
    return {
        payload: payload
            .map(validate)
            .map((p) => omit(p, ['web3', 'web3Sender', 'multicallContract', 'explorerApiClient'])),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type UpdateDBBatchedAction = ReturnType<typeof updateDBBatchedAction>;
export const isUpdateDBBatchedAction = updateDBBatchedAction.match;

export default UpdateDBBatchedAction;

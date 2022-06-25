import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { omit } from '../../../utils/lodash/index.js';
import { name } from '../../common.js';
import { Network, validate } from '../../model/index.js';

export const CREATE_DB = `${name}/CREATE_DB`;
export const createDBAction = createAction(CREATE_DB, (payload: Network, uuid?: string) => {
    return {
        payload: omit(validate(payload), ['web3', 'web3Sender', 'multicallContract', 'explorerApiClient']),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBAction = ReturnType<typeof createDBAction>;
export const isCreateDBAction = createDBAction.match;

export default createDBAction;

import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { isAddress } from '../../../utils/web3-utils/index.js';
import { name } from '../../common.js';
import { ContractId } from '../../model/index.js';

export const REMOVE_DB = `${name}/remove_DB`;
export const removeDBAction = createAction(REMOVE_DB, (payload: ContractId, uuid?: string) => {
    if (!isAddress(payload.address)) throw new Error(`Invalid address: ${payload.address}`);
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type RemoveDBAction = ReturnType<typeof removeDBAction>;
export const isRemoveDBAction = removeDBAction.match;

export default RemoveDBAction;

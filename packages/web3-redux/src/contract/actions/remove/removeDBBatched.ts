import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { isAddress } from '../../../utils/web3-utils/index.js';
import { name } from '../../common.js';
import { ContractId } from '../../model/index.js';

export const REMOVE_DB_BATCHED = `${name}/remove_DB_BATCHED`;
export const removeDBBatchedAction = createAction(REMOVE_DB_BATCHED, (payload: ContractId[], uuid?: string) => {
    payload.forEach((p) => {
        if (!isAddress(p.address)) throw new Error(`Invalid address: ${p.address}`);
    });
    return {
        payload: payload.map((p) => {
            return { networkId: p.networkId, address: p.address.toLowerCase() };
        }),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type RemoveDBBatchedAction = ReturnType<typeof removeDBBatchedAction>;
export const isRemoveDBBatchedAction = removeDBBatchedAction.match;

export default RemoveDBBatchedAction;

import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { BlockId } from '../../model/index.js';

export const REMOVE_DB_BATCHED = `${name}/remove_DB_BATCHED`;
export const removeDBBatchedAction = createAction(REMOVE_DB_BATCHED, (payload: BlockId[], uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type RemoveDBBatchedAction = ReturnType<typeof removeDBBatchedAction>;
export const isRemoveDBBatchedAction = removeDBBatchedAction.match;

export default RemoveDBBatchedAction;

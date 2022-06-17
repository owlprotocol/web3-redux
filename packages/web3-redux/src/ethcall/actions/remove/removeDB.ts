import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { EthCallId } from '../../model/index.js';

export const REMOVE_DB = `${name}/remove_DB`;
export const removeDBAction = createAction(REMOVE_DB, (payload: EthCallId, uuid?: string) => {
    return {
        payload: {
            ...payload,
            to: payload.to.toLowerCase(),
            from: payload.from ? payload.from.toLowerCase() : undefined,
        },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type RemoveDBAction = ReturnType<typeof removeDBAction>;
export const isRemoveDBAction = removeDBAction.match;

export default RemoveDBAction;

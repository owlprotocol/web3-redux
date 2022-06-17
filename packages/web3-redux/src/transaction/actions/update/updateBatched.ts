import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Transaction, validate } from '../../model/index.js';

/** @internal */
export const UPDATE_BATCHED = `${name}/UPDATE_BATCHED`;
/** @category Actions */
export const updateBatchedAction = createAction(UPDATE_BATCHED, (payload: Transaction[], uuid?: string) => {
    return {
        payload: payload.map(validate),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type UpdateBatchedAction = ReturnType<typeof updateBatchedAction>;
/** @internal */
export const isUpdateBatchedAction = updateBatchedAction.match;

export default updateBatchedAction;

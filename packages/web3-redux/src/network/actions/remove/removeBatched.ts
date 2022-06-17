import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { NetworkId } from '../../model/index.js';

/** @internal */
export const REMOVE_BATCHED = `${name}/REMOVE_BATCHED`;
/** @category Actions */
export const removeBatchedAction = createAction(REMOVE_BATCHED, (payload: NetworkId[], uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type RemoveBatchedAction = ReturnType<typeof removeBatchedAction>;
/** @internal */
export const isRemoveBatchedAction = removeBatchedAction.match;

export default removeBatchedAction;

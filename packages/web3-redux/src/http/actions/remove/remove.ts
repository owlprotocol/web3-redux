import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';

/** @internal */
export const REMOVE = `${name}/REMOVE`;
/** @category Actions */
export const removeAction = createAction(REMOVE, (payload: string, uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type RemoveAction = ReturnType<typeof removeAction>;
/** @internal */
export const isRemoveAction = removeAction.match;

export default removeAction;

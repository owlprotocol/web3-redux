import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { TransactionId } from '../model/interface.js';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: TransactionId) => {
    return { payload };
});

/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;

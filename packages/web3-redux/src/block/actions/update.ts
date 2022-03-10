import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { BlockHeader, validate } from '../model';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: BlockHeader) => {
    return { payload: validate(payload) };
});
/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;

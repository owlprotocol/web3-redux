import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { Contract, validate } from '../model/interface.js';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: Contract) => {
    return { payload: validate(payload) };
});
/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;

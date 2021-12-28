import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Account, validate } from '../model/interface';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: Account) => {
    return { payload: validate(payload) };
});
/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;

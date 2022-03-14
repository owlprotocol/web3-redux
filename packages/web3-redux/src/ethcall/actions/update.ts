import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { EthCall, validate } from '../model/interface.js';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: EthCall) => {
    return { payload: validate(payload) };
});

/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;

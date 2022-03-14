import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { Contract, validate } from '../model/interface.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Contract) => {
    return { payload: validate(payload) };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

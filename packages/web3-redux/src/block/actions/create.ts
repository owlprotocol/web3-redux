import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { validate, BlockHeader } from '../model';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: BlockHeader) => {
    return { payload: validate(payload) };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

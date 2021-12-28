import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Interface } from '../model/interface';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Interface) => {
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

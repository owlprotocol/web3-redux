import { createAction } from '@reduxjs/toolkit';
import { ReduxError } from '../model/interface.js';
import { name } from '../common.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: ReduxError) => {
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

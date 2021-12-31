import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Contract } from '../model/interface';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction<Contract>(CREATE);
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

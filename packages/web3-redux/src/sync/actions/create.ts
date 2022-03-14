import { createAction } from '@reduxjs/toolkit';
import { name } from './common.js';
import { Sync } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction<Sync>(CREATE);

/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

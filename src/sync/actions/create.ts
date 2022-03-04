import { createAction } from '@reduxjs/toolkit';
import { name } from './common';
import { Sync } from '../model';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction<Sync>(CREATE);

/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

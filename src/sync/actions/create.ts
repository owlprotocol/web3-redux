import { createAction } from '@reduxjs/toolkit';
import { Sync } from '../model';
import { name } from './common';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction<Sync>(CREATE);

/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

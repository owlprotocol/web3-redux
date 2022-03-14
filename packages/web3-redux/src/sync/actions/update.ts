import { createAction } from '@reduxjs/toolkit';
import { name } from './common.js';
import { Sync } from '../model/index.js';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction<Sync>(UPDATE);

/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

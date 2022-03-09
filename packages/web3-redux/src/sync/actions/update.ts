import { createAction } from '@reduxjs/toolkit';
import { name } from './common';
import { Sync } from '../model';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction<Sync>(UPDATE);

/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

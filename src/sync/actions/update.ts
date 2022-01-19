import { createAction } from '@reduxjs/toolkit';
import { Sync } from '../model';
import { name } from './common';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction<Sync>(UPDATE);

/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

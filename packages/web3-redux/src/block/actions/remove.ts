import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { BlockId } from '../model/id.js';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction<BlockId>(REMOVE);
/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;

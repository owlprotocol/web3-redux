import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { EthCallId } from '../model/interface';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction<EthCallId>(REMOVE);

/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;

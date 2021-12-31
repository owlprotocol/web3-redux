import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import BlockHeader from '../model/BlockHeader';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction<BlockHeader>(CREATE);
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

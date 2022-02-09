import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IpfsId } from '../model/interface';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: IpfsId) => {
    return { payload: { contentId: payload.contentId } };
});
/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;

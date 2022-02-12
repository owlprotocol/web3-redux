import { createAction } from '@reduxjs/toolkit';
import { isCIDGuard } from '../../utils';
import { name } from '../common';
import { Ipfs } from '../model/interface';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: Ipfs) => {
    isCIDGuard(payload.contentId);
    return { payload };
});
/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;

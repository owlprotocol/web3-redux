import { createAction } from '@reduxjs/toolkit';
import { isCIDGuard } from '../../utils/index.js';
import { name } from '../common.js';
import { Ipfs } from '../model/interface.js';

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

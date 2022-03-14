import { createAction } from '@reduxjs/toolkit';
import { isCIDGuard } from '../../utils/index.js';
import { name } from '../common.js';
import { Ipfs } from '../model/interface.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Ipfs) => {
    isCIDGuard(payload.contentId);
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

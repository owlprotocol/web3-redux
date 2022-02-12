import { createAction } from '@reduxjs/toolkit';
import { isCID } from '../../utils';
import { name } from '../common';
import { Ipfs } from '../model/interface';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Ipfs) => {
    isCID(payload.contentId);
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

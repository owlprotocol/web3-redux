import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { _4ByteSignature } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Action */
export const create = createAction(CREATE, (payload: _4ByteSignature) => {
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

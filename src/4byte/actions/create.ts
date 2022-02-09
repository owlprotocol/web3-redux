import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { _4ByteSignature, validate } from '../model';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Action */
export const create = createAction(CREATE, (payload: _4ByteSignature) => {
    return { payload: validate(payload) };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;

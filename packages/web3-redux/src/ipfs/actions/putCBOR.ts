import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const PUT_CBOR = `${name}/PUT_CBOR`;
/** @category Actions */
export const putCBOR = createAction(PUT_CBOR, (payload: any) => {
    return { payload };
});
/** @internal */
export type PutCBORAction = ReturnType<typeof putCBOR>;
/** @internal */
export const isPutCBORAction = putCBOR.match;

export default putCBOR;

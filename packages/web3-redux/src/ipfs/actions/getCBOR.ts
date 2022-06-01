import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { CID } from 'multiformats/cid';
import { name } from '../common.js';

/** @internal */
export const GET_CBOR = `${name}/GET_CBOR`;
/** @category Actions */
export const getCBOR = createAction(GET_CBOR, (payload: { cid: CID | string }) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type GetCBORAction = ReturnType<typeof getCBOR>;
/** @internal */
export const isGetCBORAction = getCBOR.match;

export default getCBOR;

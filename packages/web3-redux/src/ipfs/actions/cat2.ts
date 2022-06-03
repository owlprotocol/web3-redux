import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface Payload {
    path: Parameters<IPFS['cat']>[0];
    options: Parameters<IPFS['cat']>[1];
}

/** @internal */
export const CAT2 = `${name}/CAT2`;
/** @category Actions */
export const cat2 = createAction(CAT2, (payload: Payload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type Cat2Action = ReturnType<typeof cat2>;
/** @internal */
export const isCat2Action = cat2.match;

export default cat2;

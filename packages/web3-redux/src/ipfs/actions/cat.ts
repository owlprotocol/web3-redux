import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';

export interface CatPayload {
    path: Parameters<IPFS['cat']>[0];
    options?: Parameters<IPFS['cat']>[1];
}

/** @internal */
export const CAT = `${name}/CAT`;
/** @category Actions */
export const catAction = createAction(CAT, (payload: CatPayload, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type CatAction = ReturnType<typeof catAction>;
/** @internal */
export const isCatAction = catAction.match;

export default catAction;

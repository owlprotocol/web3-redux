import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

export interface BlockGetPayload {
    cid: Parameters<IPFS['block']['get']>[0];
    options?: Parameters<IPFS['block']['get']>[1];
}

/** @internal */
export const BLOCK_GET = `${name}/BLOCK/GET`;
/** @category Actions */
export const blockGet = createAction(BLOCK_GET, (payload: BlockGetPayload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type BlockGetAction = ReturnType<typeof blockGet>;
/** @internal */
export const isBlockGetAction = blockGet.match;

export default blockGet;

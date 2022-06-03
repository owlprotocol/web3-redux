import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface Payload {
    block: Parameters<IPFS['block']['put']>[0];
    options?: Parameters<IPFS['block']['put']>[1];
}

/** @internal */
export const BLOCK_PUT = `${name}/blockPut`;
/** @category Actions */
export const blockPut = createAction(BLOCK_PUT, (payload: Payload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type BlockPutAction = ReturnType<typeof blockPut>;
/** @internal */
export const isBlockPutAction = blockPut.match;

export default blockPut;

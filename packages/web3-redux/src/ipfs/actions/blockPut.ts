import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { encode as encodeCBOR } from '@ipld/dag-cbor';

import { name } from '../common.js';

export interface BlockPutPayload {
    block: Parameters<IPFS['block']['put']>[0];
    options?: Parameters<IPFS['block']['put']>[1];
}

/** @internal */
export const BLOCK_PUT = `${name}/BLOCK/PUT`;
/** @category Actions */
export const blockPut = createAction(BLOCK_PUT, (payload: BlockPutPayload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});

interface PayloadCBOR {
    data: Record<string, any>;
    options?: Parameters<IPFS['block']['put']>[1];
}
/** @category Actions */
export const blockPutCBOR = ({ data, options }: PayloadCBOR) => {
    const block = encodeCBOR(data);
    return blockPut({ block, options: { ...options, version: 1, format: 'dag-cbor' } });
};

/** @internal */
export type BlockPutAction = ReturnType<typeof blockPut>;
/** @internal */
export const isBlockPutAction = blockPut.match;

export default blockPut;

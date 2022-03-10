import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const GET_BLOCK_NUMBER = `${name}/GET_BLOCK_NUMBER`;
/** @category Actions */
export const getBlockNumber = createAction(GET_BLOCK_NUMBER, (payload: string) => {
    return { payload };
});

/** @internal */
export type GetBlockNumberAction = ReturnType<typeof getBlockNumber>;
/** @internal */
export const isGetBlockNumberAction = getBlockNumber.match;

export default getBlockNumber;

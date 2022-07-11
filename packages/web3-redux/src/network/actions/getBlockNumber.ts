import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';

/** @internal */
export const GET_BLOCK_NUMBER = `${name}/GET_BLOCK_NUMBER`;
/** @category Actions */
export const getBlockNumber = createAction(GET_BLOCK_NUMBER, (payload: string, uuid?: string) => {
    return { payload, meta: { uuid: uuid ?? uuidv4() } };
});

/** @internal */
export type GetBlockNumberAction = ReturnType<typeof getBlockNumber>;
/** @internal */
export const isGetBlockNumberAction = getBlockNumber.match;

export default getBlockNumber;

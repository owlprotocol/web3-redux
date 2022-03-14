import { createAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { name } from '../common.js';

/** @internal */
export const GET_CHAIN_ID = `${name}/GET_CHAIN_ID`;
/** @category Actions */
export const getChainId = createAction(GET_CHAIN_ID, (payload: Web3) => {
    return { payload };
});

/** @internal */
export type GetChainIdAction = ReturnType<typeof getChainId>;
/** @internal */
export const isGetChainIdAction = getChainId.match;

export default getChainId;

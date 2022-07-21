import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';

import { name } from '../common.js';

/** @internal */
export const GET_CHAIN_ID = `${name}/GET_CHAIN_ID`;
/** @category Actions */
export const getChainId = createAction(GET_CHAIN_ID, (payload: Web3, uuid?: string) => {
    return { payload, meta: { uuid: uuid ?? uuidv4() } };
});

/** @internal */
export type GetChainIdAction = ReturnType<typeof getChainId>;
/** @internal */
export const isGetChainIdAction = getChainId.match;

export default getChainId;

export * from './indexCRUD.js';
import { GET_BLOCK_NUMBER, getBlockNumber, GetBlockNumberAction, isGetBlockNumberAction } from './getBlockNumber.js';
import { GET_CHAIN_ID, getChainId, GetChainIdAction, isGetChainIdAction } from './getChainId.js';

export type SagaAction = GetBlockNumberAction | GetChainIdAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isGetBlockNumberAction(action) || isGetChainIdAction(action);
}

export type { GetBlockNumberAction, GetChainIdAction };

export { GET_BLOCK_NUMBER, getBlockNumber, isGetBlockNumberAction, GET_CHAIN_ID, getChainId, isGetChainIdAction };

import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { GET_BLOCK_NUMBER, getBlockNumber, GetBlockNumberAction, isGetBlockNumberAction } from './getBlockNumber.js';
import { GET_CHAIN_ID, getChainId, GetChainIdAction, isGetChainIdAction } from './getChainId.js';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type Action = ReducerAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isGetBlockNumberAction(action);
}

export type { CreateAction, RemoveAction, UpdateAction, SetAction, GetBlockNumberAction, GetChainIdAction };

export {
    CREATE,
    create,
    isCreateAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
    SET,
    set,
    isSetAction,
    GET_BLOCK_NUMBER,
    getBlockNumber,
    isGetBlockNumberAction,
    GET_CHAIN_ID,
    getChainId,
    isGetChainIdAction,
};

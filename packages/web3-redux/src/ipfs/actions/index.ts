import {
    CREATE,
    createAction,
    CreateAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    CreateBatchedAction,
    isCreateBatchedAction,
    CREATE_DB,
    createDBAction,
    CreateDBAction,
    isCreateDBAction,
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    CreateDBBatchedAction,
    isCreateDBBatchedAction,
} from './create/index.js';
import {
    REMOVE,
    removeAction,
    RemoveAction,
    isRemoveAction,
    REMOVE_BATCHED,
    removeBatchedAction,
    RemoveBatchedAction,
    isRemoveBatchedAction,
    REMOVE_DB,
    removeDBAction,
    RemoveDBAction,
    isRemoveDBAction,
    REMOVE_DB_BATCHED,
    removeDBBatchedAction,
    RemoveDBBatchedAction,
    isRemoveDBBatchedAction,
} from './remove/index.js';
import {
    UPDATE,
    updateAction,
    UpdateAction,
    isUpdateAction,
    UPDATE_BATCHED,
    updateBatchedAction,
    UpdateBatchedAction,
    isUpdateBatchedAction,
    UPDATE_DB,
    updateDBAction,
    UpdateDBAction,
    isUpdateDBAction,
    UPDATE_DB_BATCHED,
    updateDBBatchedAction,
    UpdateDBBatchedAction,
    isUpdateDBBatchedAction,
} from './update/index.js';

import { LOAD_DB_ALL, loadDBAllAction, LoadDBAllAction, isLoadDBAllAction } from './loadDBAll.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { FETCH_IPFS, fetchIpfs, FetchIpfsAction, isFetchIpfsAction } from './fetchIpfs.js';
import { OBJECT_GET, objectGet, ObjectGetAction, isObjectGetAction } from './objectGet.js';
import { CAT, cat, CatAction, isCatAction } from './cat.js';
import { PUT_CBOR, putCBOR, PutCBORAction, isPutCBORAction } from './putCBOR.js';
import { GET_CBOR, getCBOR, GetCBORAction, isGetCBORAction } from './getCBOR.js';
//Core IPFS API - Root
import { ADD, add, AddAction, isAddAction } from './add.js';
import { ADD_ALL, addAll, AddAllAction, isAddAllAction } from './addAll.js';
import { CAT2, cat2, Cat2Action, isCat2Action } from './cat2.js';
import { GET, get, GetAction, isGetAction } from './get.js';
import { LS, ls, LsAction, isLsAction } from './ls.js';
//Core IPFS API - Block
import { BLOCK_GET, blockGet, BlockGetAction, isBlockGetAction } from './blockGet.js';
import { BLOCK_PUT, blockPut, blockPutCBOR, BlockPutAction, isBlockPutAction } from './blockPut.js';

/** @internal */
export type ReducerAction =
    | CreateAction
    | CreateBatchedAction
    | RemoveAction
    | RemoveBatchedAction
    | UpdateAction
    | UpdateBatchedAction
    | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isRemoveBatchedAction(action) ||
        isUpdateAction(action) ||
        isUpdateBatchedAction(action) ||
        isSetAction(action)
    );
}

/** @internal */
export type SagaAction =
    | CreateDBAction
    | CreateDBBatchedAction
    | RemoveAction
    | RemoveBatchedAction
    | UpdateAction
    | UpdateDBAction
    | LoadDBAllAction
    | FetchIpfsAction
    | ObjectGetAction
    | CatAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
        isRemoveDBAction(action) ||
        isRemoveDBBatchedAction(action) ||
        isUpdateDBAction(action) ||
        isUpdateDBBatchedAction(action) ||
        isLoadDBAllAction(action) ||
        isFetchIpfsAction(action) ||
        isObjectGetAction(action) ||
        isCatAction(action) ||
        isPutCBORAction(action) ||
        isGetCBORAction(action) ||
        isAddAction(action) ||
        isAddAllAction(action) ||
        isCat2Action(action) ||
        isGetAction(action) ||
        isLsAction(action) ||
        isBlockGetAction(action) ||
        isBlockPutAction(action)
    );
}

/** @internal */
export type Action = ReducerAction | SagaAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export type {
    CreateAction,
    CreateBatchedAction,
    CreateDBAction,
    CreateDBBatchedAction,
    RemoveAction,
    RemoveBatchedAction,
    RemoveDBAction,
    RemoveDBBatchedAction,
    UpdateAction,
    UpdateBatchedAction,
    UpdateDBAction,
    UpdateDBBatchedAction,
};

export type {
    LoadDBAllAction,
    SetAction,
    FetchIpfsAction,
    ObjectGetAction,
    CatAction,
    PutCBORAction,
    GetCBORAction,
    AddAction,
    AddAllAction,
    Cat2Action,
    GetAction,
    LsAction,
    BlockGetAction,
    BlockPutAction,
};

export {
    CREATE,
    createAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    isCreateBatchedAction,
    CREATE_DB,
    createDBAction,
    isCreateDBAction,
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    isCreateDBBatchedAction,
    REMOVE,
    removeAction,
    isRemoveAction,
    REMOVE_BATCHED,
    removeBatchedAction,
    isRemoveBatchedAction,
    REMOVE_DB,
    removeDBAction,
    isRemoveDBAction,
    REMOVE_DB_BATCHED,
    removeDBBatchedAction,
    isRemoveDBBatchedAction,
    UPDATE,
    updateAction,
    isUpdateAction,
    UPDATE_BATCHED,
    updateBatchedAction,
    isUpdateBatchedAction,
    UPDATE_DB,
    updateDBAction,
    isUpdateDBAction,
    UPDATE_DB_BATCHED,
    updateDBBatchedAction,
    isUpdateDBBatchedAction,
};

export {
    LOAD_DB_ALL,
    loadDBAllAction,
    isLoadDBAllAction,
    SET,
    set,
    isSetAction,
    FETCH_IPFS,
    fetchIpfs,
    isFetchIpfsAction,
    OBJECT_GET,
    objectGet,
    isObjectGetAction,
    CAT,
    cat,
    isCatAction,
    PUT_CBOR,
    putCBOR,
    isPutCBORAction,
    GET_CBOR,
    getCBOR,
    isGetCBORAction,
    ADD,
    add,
    isAddAction,
    ADD_ALL,
    addAll,
    isAddAllAction,
    CAT2,
    cat2,
    isCat2Action,
    GET,
    get,
    isGetAction,
    LS,
    ls,
    isLsAction,
    BLOCK_GET,
    blockGet,
    isBlockGetAction,
    BLOCK_PUT,
    blockPut,
    blockPutCBOR,
    isBlockPutAction,
};

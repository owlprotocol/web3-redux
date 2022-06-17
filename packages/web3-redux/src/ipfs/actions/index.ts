import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { CREATE_BATCHED, createBatchedAction, CreateBatchedAction, isCreateBatchedAction } from './createBatched.js';
import { CREATE_DB, createDBAction, CreateDBAction, isCreateDBAction } from './createDB.js';
import {
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    CreateDBBatchedAction,
    isCreateDBBatchedAction,
} from './createDBBatched.js';
import { LOAD_DB_ALL, loadDBAllAction, LoadDBAllAction, isLoadDBAllAction } from './loadDBAll.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
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

export type ReducerAction = CreateAction | CreateBatchedAction | RemoveAction | UpdateAction | SetAction;

export function isReducerAction(action: { type: string }): action is ReducerAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isUpdateAction(action) ||
        isSetAction(action)
    );
}
/** @internal */
export type SagaAction =
    | CreateDBAction
    | CreateDBBatchedAction
    | LoadDBAllAction
    | FetchIpfsAction
    | ObjectGetAction
    | CatAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
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
    LoadDBAllAction,
    RemoveAction,
    UpdateAction,
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
    create,
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
    LOAD_DB_ALL,
    loadDBAllAction,
    isLoadDBAllAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
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

import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { FETCH_IPFS, fetchIpfs, FetchIpfsAction, isFetchIpfsAction } from './fetchIpfs.js';
import { OBJECT_GET, objectGet, ObjectGetAction, isObjectGetAction } from './objectGet.js';
import { CAT, cat, CatAction, isCatAction } from './cat.js';
import { PUT_CBOR, putCBOR, PutCBORAction, isPutCBORAction } from './putCBOR.js';
import { GET_CBOR, getCBOR, GetCBORAction, isGetCBORAction } from './getCBOR.js';

export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;

export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}
/** @internal */
export type SagaAction = FetchIpfsAction | ObjectGetAction | CatAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isFetchIpfsAction(action) ||
        isObjectGetAction(action) ||
        isCatAction(action) ||
        isPutCBORAction(action) ||
        isGetCBORAction(action)
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
    RemoveAction,
    UpdateAction,
    SetAction,
    FetchIpfsAction,
    ObjectGetAction,
    CatAction,
    PutCBORAction,
    GetCBORAction,
};

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
};

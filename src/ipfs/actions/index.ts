import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { FETCH_IPFS, fetchIpfs, FetchIpfsAction, isFetchIpfsAction } from './fetchIpfs';
import { OBJECT_GET, objectGet, ObjectGetAction, isObjectGetAction } from './objectGet';
import { CAT, cat, CatAction, isCatAction } from './cat';

export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;

export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}
/** @internal */
export type SagaAction = FetchIpfsAction | ObjectGetAction | CatAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchIpfsAction(action) || isObjectGetAction(action) || isCatAction(action);
}

/** @internal */
export type Action = ReducerAction | SagaAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export type { CreateAction, RemoveAction, UpdateAction, SetAction, FetchIpfsAction, ObjectGetAction, CatAction };

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
};

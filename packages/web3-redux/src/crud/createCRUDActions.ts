import { v4 as uuidv4 } from 'uuid';
import type { Action } from '@reduxjs/toolkit';
import { createAction as createReduxAction } from '../utils/createAction.js';
import { isUndefined, omitBy, pick } from '../utils/lodash/index.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @returns
 */
export function createCRUDActions<
    U extends string,
    T_ID,
    T_Encoded extends T_ID = T_ID,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
>(
    name: U,
    validators?: {
        validateId?: (id: T_ID) => T_ID;
        validate?: (item: T) => T;
    },
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => id);
    const validate = validators?.validate ?? ((item: T) => item);

    /** Actions */
    const CREATE = `${name}/CREATE`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;
    const PUT = `${name}/PUT`;
    const PUT_BATCHED = `${PUT}/BATCHED`;
    const UPDATE = `${name}/UPDATE`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;
    const UPSERT = `${name}/UPSERT`;
    const UPSERT_BATCHED = `${UPSERT}/BATCHED`;
    const DELETE = `${name}/DELETE`;
    const DELETE_BATCHED = `${DELETE}/BATCHED`;
    //const DELETE_ALL = `${DELETE}/ALL`;
    const HYDRATE = `${name}/HYDRATE`;
    const HYDRATE_BATCHED = `${HYDRATE}/BATCHED`;
    const HYDRATE_ALL = `${HYDRATE}/ALL`;

    const createAction = createReduxAction(CREATE, (payload: T, uuid?: string) => {
        return {
            payload: validate(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const createBatchedAction = createReduxAction(CREATE_BATCHED, (payload: T[], uuid?: string) => {
        return {
            payload: payload.map(validate),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const putAction = createReduxAction(PUT, (payload: T, uuid?: string) => {
        return {
            payload: validate(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const putBatchedAction = createReduxAction(PUT_BATCHED, (payload: T[], uuid?: string) => {
        return {
            payload: payload.map(validate),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const updateAction = createReduxAction(UPDATE, (payload: T, uuid?: string) => {
        return {
            payload: validate(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const updateBatchedAction = createReduxAction(UPDATE_BATCHED, (payload: T[], uuid?: string) => {
        return {
            payload: payload.map(validate),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const upsertAction = createReduxAction(UPSERT, (payload: T, uuid?: string) => {
        return {
            payload: validate(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const upsertBatchedAction = createReduxAction(UPSERT_BATCHED, (payload: T[], uuid?: string) => {
        return {
            payload: payload.map(validate),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const deleteAction = createReduxAction(DELETE, (payload: T_ID, uuid?: string) => {
        return {
            payload: validateId(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const deleteBatchedAction = createReduxAction(DELETE_BATCHED, (payload: T_ID[], uuid?: string) => {
        return {
            payload: payload.map(validateId),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const hydrateAction = createReduxAction(
        HYDRATE,
        (payload: { id: T_Idx; defaultItem?: T_Encoded }, uuid?: string) => {
            const idxKeys = Object.keys(payload.id);
            const idxValidate = validate(payload.id as unknown as T) as unknown as T_Idx;
            const defaultItemKeys = payload.defaultItem ? Object.keys(payload.defaultItem) : [];
            const defaultItemValidate = payload.defaultItem ? validate(payload.defaultItem as T) : {};
            const p = {
                id: pick(idxValidate, idxKeys) as T_Idx,
                defaultItem: payload.defaultItem ? pick(defaultItemValidate, defaultItemKeys) : undefined,
            };
            return {
                payload: omitBy(p, isUndefined) as unknown as typeof p,
                meta: {
                    uuid: uuid ?? uuidv4(),
                },
            };
        },
    );
    const hydrateBatchedAction = createReduxAction(HYDRATE_BATCHED, (payload: T_ID[], uuid?: string) => {
        return {
            payload: payload.map(validateId),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const hydrateAllAction = (uuid?: string) => {
        return {
            type: HYDRATE_ALL,
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    };

    const actionTypes = {
        CREATE,
        CREATE_BATCHED,
        PUT,
        PUT_BATCHED,
        UPDATE,
        UPDATE_BATCHED,
        UPSERT,
        UPSERT_BATCHED,
        DELETE,
        DELETE_BATCHED,
        HYDRATE,
        HYDRATE_BATCHED,
        HYDRATE_ALL,
    };

    const actions = {
        create: createAction,
        createBatched: createBatchedAction,
        put: putAction,
        putBatched: putBatchedAction,
        update: updateAction,
        updateBatched: updateBatchedAction,
        upsert: upsertAction,
        upsertBatched: upsertBatchedAction,
        delete: deleteAction,
        deleteBatched: deleteBatchedAction,
        hydrate: hydrateAction,
        hydrateBatched: hydrateBatchedAction,
        hydrateAll: hydrateAllAction,
    };

    const isAction = (action: Action) => {
        return (
            actions.create.match(action) ||
            actions.createBatched.match(action) ||
            actions.put.match(action) ||
            actions.putBatched.match(action) ||
            actions.update.match(action) ||
            actions.updateBatched.match(action) ||
            actions.upsert.match(action) ||
            actions.upsertBatched.match(action) ||
            actions.delete.match(action) ||
            actions.deleteBatched.match(action) ||
            actions.hydrate.match(action) ||
            actions.hydrateBatched.match(action) ||
            HYDRATE_ALL === action.type
        );
    };

    return {
        actions,
        actionTypes,
        isAction,
    };
}

export default createCRUDActions;

import { useEffect, useMemo, useState } from 'react';
import { Action, createAction as createReduxAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { put as putSaga, call, all as allSaga, takeEvery } from 'typed-redux-saga';
import { useLiveQuery } from 'dexie-react-hooks';
import { createSelector } from 'redux-orm';
import { useDispatch, useSelector } from 'react-redux';
import { IndexableTypeArrayReadonly } from 'dexie';
import { compact, filter } from './utils/lodash/index.js';
import { create as createError } from './error/actions/create.js';
import getDB from './db.js';
import { getOrm } from './orm.js';
import toReduxOrmId from './utils/toReduxORMId.js';
import isDefinedRecord from './utils/isDefinedRecord.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validateId Validate id to Dexie-supported format. Defaults to calling object values.
 * @param validate Validate item that will be inserted computing any default values. Defaults to identity function.
 * @param hydrate Instantiate objects that are not encoded in Dexie.
 * @param encode Encode an hydrated object to be inserted stripping out objects.
 * @returns
 */
export function createCRUDModel<
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
            hydrate?: (item: T, sess?: any) => T;
            encode?: (item: T) => T_Encoded;
            toPrimaryKey?: (id: T_ID) => IndexableTypeArrayReadonly;
        },
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => id);
    const validate = validators?.validate ?? ((item: T) => item);
    const hydrate = validators?.hydrate ?? ((id: T) => id);
    const encode = validators?.encode ?? ((item: T) => item);
    const toPrimaryKey = validators?.toPrimaryKey ?? ((id: T_ID) => Object.values(id) as IndexableTypeArrayReadonly);

    const toPrimaryKeyString = (id: T_ID | string): string =>
        typeof id === 'string' ? id : toReduxOrmId(toPrimaryKey(id));

    /** Actions */
    const CREATE = `${name}/CREATE`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;
    const UPDATE = `${name}/UPDATE`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;
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
    const hydrateAction = createReduxAction(HYDRATE, (payload: T_ID, uuid?: string) => {
        return {
            payload: validateId(payload),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
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
        UPDATE,
        UPDATE_BATCHED,
        DELETE,
        DELETE_BATCHED,
        HYDRATE,
        HYDRATE_BATCHED,
        HYDRATE_ALL,
    };

    const actions = {
        create: createAction,
        createBatched: createBatchedAction,
        update: updateAction,
        updateBatched: updateBatchedAction,
        delete: deleteAction,
        deleteBatched: deleteBatchedAction,
        hydrate: hydrateAction,
        hydrateBatched: hydrateBatchedAction,
        hydrateAll: hydrateAllAction,
    };

    type CreateAction = ReturnType<typeof actions.create>;
    type CreateBatchedAction = ReturnType<typeof actions.createBatched>;
    type UpdateAction = ReturnType<typeof actions.update>;
    type UpdateBatchedAction = ReturnType<typeof actions.updateBatched>;
    type DeleteAction = ReturnType<typeof actions.delete>;
    type DeleteBatchedAction = ReturnType<typeof actions.deleteBatched>;
    type HydrateAction = ReturnType<typeof actions.hydrate>;
    type HydrateBatchedAction = ReturnType<typeof actions.hydrateBatched>;
    type HydrateAllAction = ReturnType<typeof actions.hydrateAll>;

    const isAction = (action: Action) => {
        return (
            createAction.match(action) ||
            createBatchedAction.match(action) ||
            updateAction.match(action) ||
            updateBatchedAction.match(action) ||
            deleteAction.match(action) ||
            deleteBatchedAction.match(action) ||
            hydrateAction.match(action) ||
            hydrateBatchedAction.match(action) ||
            HYDRATE_ALL === action.type
        );
    };

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: Action) => {
        const Model = sess[name];
        if (createAction.match(action) || updateAction.match(action)) {
            Model.upsert(hydrate(action.payload, sess));
        } else if (createBatchedAction.match(action) || updateBatchedAction.match(action)) {
            action.payload.forEach((p) => Model.upsert(hydrate(p, sess)));
        } else if (deleteAction.match(action)) {
            Model.withId(toPrimaryKeyString(action.payload))?.delete();
        } else if (deleteBatchedAction.match(action)) {
            action.payload.forEach((p) => Model.withId(toPrimaryKeyString(p))?.delete());
        }
        return sess;
    };

    /** Redux ORM Selectors */
    //Only create selectors if orm model defined
    const ormModel = getOrm()[name];
    const select = ormModel ? createSelector(getOrm()[name]) : () => undefined;
    const selectByIdSingle = (state: any, id: Partial<T_ID> | string | undefined): T | undefined => {
        if (!id) return undefined;
        if (typeof id != 'string' && !isDefinedRecord(id)) return undefined;
        return select(state, toPrimaryKeyString(id));
    };

    const selectByIdMany = (state: any, ids?: T_ID[] | string[]): (T | null)[] => {
        if (!ids) return select(state); //Return all
        return select(state, ids.map(toPrimaryKeyString));
    };

    const selectAll = (state: any): T[] => {
        return select(state);
    };

    const selectWhere = (state: any, f: Partial<T_Encoded>) => {
        const all = selectByIdMany(state);
        return filter(all, f) as T_Encoded[];
    };

    const selectors = {
        select,
        selectByIdSingle,
        selectByIdMany,
        selectWhere,
        selectAll,
    };

    /** Dexie Getters */
    const get = async (idx: T_Idx | string) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        return table.get(idx);
    };

    const bulkGet = async (ids: T_ID[] | string[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkGet(ids.map((id) => (typeof id === 'string' ? id : toPrimaryKey(id))));
    };

    const all = async () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = async (filter: T_Idx, options?: { limit?: number; offset?: number }) => {
        const limit = options?.limit;
        const offset = options?.offset;

        const db = getDB();
        const table = db.table<T_Encoded>(name);
        let result = table.where(filter);
        if (offset) result = result.offset(offset);
        if (limit) result = result.limit(limit);

        return result.toArray();
    };

    const add = async (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.add(encode(item));
    };

    const bulkAdd = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkAdd(items.map(encode));
    };

    const put = async (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.put(encode(item));
    };

    const bulkPut = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkPut(items.map(encode));
    };

    const update = async (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        const encoded = encode(item);
        return table.update(encoded, encoded);
    };

    const bulkUpdate = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        return db.transaction('rw', table, async () => {
            const promises = items.map((t) => {
                const encoded = encode(t);
                table.update(encoded, encoded);
            });
            return Promise.all(promises);
        });
    };

    const deleteDB = async (id: T_ID) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.delete(Object.values(id));
    };

    const bulkDelete = async (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkDelete(ids.map(Object.values));
    };

    const clear = async () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.clear();
    };

    const db = {
        get,
        bulkGet,
        all,
        where,
        add,
        bulkAdd,
        put,
        bulkPut,
        update,
        bulkUpdate,
        delete: deleteDB,
        bulkDelete,
        clear,
    };

    /** Dexie Sagas */
    const CREATE_ERROR = `${CREATE}/ERROR`;
    const CREATE_BATCHED_ERROR = `${CREATE_BATCHED}/ERROR`;
    const UPDATE_ERROR = `${UPDATE}/ERROR`;
    const UPDATE_BATCHED_ERROR = `${UPDATE_BATCHED}/ERROR`;
    const DELETE_ERROR = `${DELETE}/ERROR`;
    const DELETE_BATCHED_ERROR = `${DELETE_BATCHED}/ERROR`;

    const createSaga = function* (action: CreateAction) {
        try {
            const { payload } = action;
            yield* call(add, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: CREATE_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const createBatchedSaga = function* (action: CreateBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkAdd, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: CREATE_BATCHED_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const updateSaga = function* (action: UpdateAction) {
        try {
            const { payload } = action;

            yield* call(update, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: UPDATE_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const updateBatchedSaga = function* (action: UpdateBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkUpdate, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: UPDATE_BATCHED_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const deleteSaga = function* (action: DeleteAction) {
        try {
            const { payload } = action;

            yield* call(deleteDB, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: DELETE_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const deleteBatchedSaga = function* (action: DeleteBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkDelete, payload);
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: DELETE_BATCHED_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const hydrateSaga = function* (action: HydrateAction) {
        try {
            const { payload } = action;

            const item = yield* call(get, payload as unknown as T_Idx);
            if (item) yield* putSaga(updateAction(item as T, action.meta.uuid)); //Update redux by dispatching an update
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: DELETE_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const hydrateBatchedSaga = function* (action: HydrateBatchedAction) {
        try {
            const { payload } = action;

            const items = yield* call(bulkGet, payload);
            if (items) yield* putSaga(updateBatchedAction(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: DELETE_BATCHED_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const hydrateAllSaga = function* (action: HydrateAllAction) {
        try {
            const items = yield* call(all);
            if (items) yield* putSaga(updateBatchedAction(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
        } catch (error) {
            yield* putSaga(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: DELETE_BATCHED_ERROR,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };

    const crudRootSaga = function* () {
        yield* allSaga([
            takeEvery(CREATE, createSaga),
            takeEvery(CREATE_BATCHED, createBatchedSaga),
            takeEvery(UPDATE, updateSaga),
            takeEvery(UPDATE_BATCHED, updateBatchedSaga),
            takeEvery(DELETE, deleteSaga),
            takeEvery(DELETE_BATCHED, deleteBatchedSaga),
            takeEvery(HYDRATE, hydrateSaga),
            takeEvery(HYDRATE_BATCHED, hydrateBatchedSaga),
            takeEvery(HYDRATE_ALL, hydrateAllSaga),
        ]);
    };

    const sagas = {
        create: createSaga,
        createBatchedAction: createBatchedSaga,
        update: updateSaga,
        updateBatched: updateBatchedSaga,
        delete: deleteSaga,
        deleteBatched: deleteBatchedSaga,
        hydrate: hydrateSaga,
        hydrateBatched: hydrateBatchedSaga,
        hydrateAll: hydrateAllSaga,
        crudRootSaga,
    };

    /** Dexie Hooks */
    const useGet = (idx: Partial<T_Idx> | string | undefined) => {
        const response = useLiveQuery(
            () => (idx && (typeof idx === 'string' || isDefinedRecord(idx)) ? get(idx) : undefined),
            [JSON.stringify(idx)],
            'loading' as const,
        );
        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = isLoading || !!result; //assume exists while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };
    //TODO: string array id
    const useGetBulk = (ids: Partial<T_ID>[] | string[] | undefined) => {
        const response = useLiveQuery(
            () => {
                if (ids) {
                    const ids2 = (ids as (Partial<T_ID> | string)[]).filter((id) => {
                        return typeof id === 'string' || isDefinedRecord(id);
                    }) as T_ID[] | string[];
                    return bulkGet(ids2);
                }
                return [];
            },
            [JSON.stringify(ids)],
            'loading' as const,
        );
        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = isLoading || !!result; //assume exists while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };
    const useWhere = (filter: Partial<T_Idx> | undefined, options?: { limit?: number; offset?: number }) => {
        const limit = options?.limit;
        const offset = options?.offset;

        const filterDep = JSON.stringify(filter);
        const response = useLiveQuery(
            () => (filter && isDefinedRecord(filter) ? where(filter, { limit, offset }) : []),
            [filterDep, limit, offset],
            'loading' as const,
        );

        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = isLoading || !!result; //assume exists while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    /** Redux ORM Hooks */
    const useSelectByIdSingle = (id: Partial<T_ID> | string | undefined) => {
        return useSelector((state) => selectByIdSingle(state, id));
    };
    const useSelectByIdMany = (id?: T_ID[] | string[]) => {
        return useSelector((state) => selectByIdMany(state, id));
    };
    const useSelectAll = () => {
        return useSelector((state) => selectAll(state));
    };
    const useSelectWhere = (f: Partial<T>) => {
        return useSelector((state) => selectWhere(state, f));
    };
    const useHydrate = (idx: Partial<T_Idx> | undefined, defaultItem?: Partial<T> | undefined) => {
        //TODO: Is this necessary?
        const [actionDispatched, setActionDispatched] = useState(false);

        const dispatch = useDispatch();
        const [itemDB, { isLoading, exists }] = useGet(idx);

        const id = useMemo(() => (itemDB ? validateId(itemDB) : undefined), [itemDB]);
        const item = useSelectByIdSingle(id);
        const itemExists = !!item;

        //Reset state
        const action = useMemo(() => {
            if (id && !itemExists) {
                if (!isLoading && !exists && defaultItem) {
                    return createAction({ ...defaultItem, ...idx } as T);
                } else if (!isLoading && exists) {
                    return hydrateAction(id);
                }
            }
        }, [id, itemExists, isLoading, exists, defaultItem]);

        useEffect(() => {
            if (itemExists) setActionDispatched(false);
        }, [idx, itemExists]);

        useEffect(() => {
            if (action && !actionDispatched) {
                dispatch(action);
                setActionDispatched(true);
            }
        }, [dispatch, action, actionDispatched]);

        const returnValue = item ?? itemDB ?? defaultItem;
        const returnOptions = { isLoading, exists };

        return [returnValue, returnOptions] as [typeof returnValue, typeof returnOptions];
    };

    const hooks = {
        useGet,
        useGetBulk,
        useWhere,
        useSelectByIdSingle,
        useSelectByIdMany,
        useSelectAll,
        useSelectWhere,
        useHydrate,
    };

    return {
        name,
        actions,
        actionTypes,
        db,
        hooks,
        sagas,
        selectors,
        isAction,
        reducer,
        validate,
        validateId,
        hydrate,
        encode,
        toPrimaryKey,
        toPrimaryKeyString,
    };
}

export default createCRUDModel;

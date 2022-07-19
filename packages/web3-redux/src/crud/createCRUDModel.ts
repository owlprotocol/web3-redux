import { useEffect, useMemo } from 'react';
import { Action } from '@reduxjs/toolkit';
import { put as putDispatch, select as selectSaga, call, all as allSaga, takeEvery } from 'typed-redux-saga';
import { useLiveQuery } from 'dexie-react-hooks';
import { createSelector } from 'redux-orm';
import { useDispatch, useSelector } from 'react-redux';
import { IndexableType, IndexableTypeArrayReadonly } from 'dexie';
import createCRUDActions from './createCRUDActions.js';
import { compact, filter, zip, isEqual, omitBy, isUndefined } from '../utils/lodash/index.js';
import { create as createError } from '../error/actions/create.js';
import getDB from '../db.js';
import { getOrm } from '../orm.js';
import toReduxOrmId from '../utils/toReduxORMId.js';
import isDefinedRecord, { isDefined } from '../utils/isDefinedRecord.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 *      @param validateId Validate id to Dexie-supported format. Defaults to calling object values.
 *      @param validate Validate item that will be inserted computing any default values. Defaults to identity function.
 *      @param hydrate Instantiate objects that are not encoded in Dexie.
 *      @param encode Encode an hydrated object to be inserted stripping out objects.
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
            toPrimaryKey?: (id: T_ID) => IndexableType;
        },
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => omitBy(id, isUndefined) as T_ID);
    const validate = validators?.validate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const hydrate = validators?.hydrate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const encode = validators?.encode ?? ((item: T) => omitBy(item, isUndefined) as T_Encoded);
    const toPrimaryKey =
        validators?.toPrimaryKey ??
        ((id: T_ID) => {
            const values = Object.values(id) as IndexableTypeArrayReadonly;
            if (values.length == 1) return values[0];
            return values;
        });

    const toPrimaryKeyString = (id: T_ID | string): string =>
        typeof id === 'string' ? id : toReduxOrmId(toPrimaryKey(id));

    const { actions, actionTypes, isAction } = createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>(name, {
        validateId,
        validate,
    });

    type CreateAction = ReturnType<typeof actions.create>;
    type CreateBatchedAction = ReturnType<typeof actions.createBatched>;
    type PutAction = ReturnType<typeof actions.put>;
    type PutBatchedAction = ReturnType<typeof actions.putBatched>;
    type UpdateAction = ReturnType<typeof actions.update>;
    type UpdateBatchedAction = ReturnType<typeof actions.updateBatched>;
    type UpsertAction = ReturnType<typeof actions.upsert>;
    type UpsertBatchedAction = ReturnType<typeof actions.upsertBatched>;
    type DeleteAction = ReturnType<typeof actions.delete>;
    type DeleteBatchedAction = ReturnType<typeof actions.deleteBatched>;
    type HydrateAction = ReturnType<typeof actions.hydrate>;
    type HydrateBatchedAction = ReturnType<typeof actions.hydrateBatched>;
    type HydrateAllAction = ReturnType<typeof actions.hydrateAll>;

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: Action) => {
        const Model = sess[name];
        if (actions.create.match(action)) {
            Model.create(hydrate(action.payload, sess));
        } else if (actions.createBatched.match(action)) {
            action.payload.forEach((p) => Model.create(hydrate(p, sess)));
        } else if (actions.put.match(action)) {
            Model.withId(toPrimaryKeyString(action.payload))?.delete();
            Model.create(hydrate(action.payload, sess));
        } else if (actions.putBatched.match(action)) {
            action.payload.forEach((p) => {
                Model.withId(toPrimaryKeyString(p))?.delete();
                Model.create(hydrate(p, sess));
            });
        } else if (actions.update.match(action)) {
            Model.update(hydrate(action.payload, sess));
        } else if (actions.updateBatched.match(action)) {
            action.payload.forEach((p) => Model.update(hydrate(p, sess)));
        } else if (actions.upsert.match(action)) {
            Model.upsert(hydrate(action.payload, sess));
        } else if (actions.upsertBatched.match(action)) {
            action.payload.forEach((p) => Model.upsert(hydrate(p, sess)));
        } else if (actions.delete.match(action)) {
            Model.withId(toPrimaryKeyString(action.payload))?.delete();
        } else if (actions.deleteBatched.match(action)) {
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
    const get = (idx: T_Idx | string) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        return table.get(idx);
    };

    const bulkGet = (ids: T_ID[] | string[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkGet(ids.map((id) => (typeof id === 'string' ? id : toPrimaryKey(id))));
    };

    const all = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = (filter: T_Idx, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const db = getDB();
        const table = db.table<T_Encoded>(name);
        let result = table.where(filter);
        if (reverse) result = result.reverse();
        if (offset) result = result.offset(offset);
        if (limit) result = result.limit(limit);

        return result.toArray();
    };

    const add = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.add(encode(item));
    };

    const bulkAdd = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkAdd(items.map(encode));
    };

    const put = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.put(encode(item));
    };

    const bulkPut = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkPut(items.map(encode));
    };

    const update = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        const encoded = encode(item);
        return table.update(encoded, encoded);
    };

    const bulkUpdate = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        return db.transaction('rw', table, () => {
            const promises = items.map((t) => {
                const encoded = encode(t);
                table.update(encoded, encoded);
            });
            return Promise.all(promises);
        });
    };

    const upsert = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const id = toPrimaryKey(item);
        const encoded = encode(item);

        return db.transaction('rw', table, () => {
            return table.get(id).then((existing) => {
                if (!existing) return table.add(encoded);
                else return table.update(id, encoded);
            });
        });
    };

    const bulkUpsert = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const ids = items.map(toPrimaryKey);
        const encoded = items.map(encode);

        return db.transaction('rw', table, () => {
            return table.bulkGet(ids).then((results) => {
                const joined = zip(encoded, ids, results) as [
                    T_Encoded,
                    IndexableTypeArrayReadonly,
                    T_Encoded | undefined,
                ][];
                const promises = joined.map(([data, id, result]) => {
                    if (!result) return table.add(data!);
                    else return table.update(id, data);
                });
                return Promise.all(promises);
            });
        });
    };

    const deleteDB = (id: T_ID) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.delete(Object.values(id));
    };

    const bulkDelete = (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkDelete(ids.map(Object.values));
    };

    const clear = () => {
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
        upsert,
        bulkUpsert,
        delete: deleteDB,
        bulkDelete,
        clear,
    };

    /** Dexie Sagas */
    const createSaga = function* (action: CreateAction) {
        try {
            const { payload } = action;
            yield* call(add, payload);
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const putSaga = function* (action: PutAction) {
        try {
            const { payload } = action;
            yield* call(put, payload);
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const putBatchedSaga = function* (action: PutBatchedAction) {
        try {
            const { payload } = action;
            yield* call(bulkPut, payload);
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const upsertSaga = function* (action: UpsertAction) {
        try {
            const { payload } = action;

            yield* call(upsert, payload);
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const upsertBatchedSaga = function* (action: UpsertBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkUpsert, payload);
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const hydrateSaga = function* (action: HydrateAction) {
        try {
            const { payload } = action;
            const { id, defaultItem } = payload

            const itemDB = yield* call(get, id);
            if (itemDB) {
                const itemRedux = yield* selectSaga(selectByIdSingle, itemDB);
                if (!itemRedux) {
                    //Update redux by dispatching an update
                    yield* putDispatch(actions.upsert(itemDB as T, action.meta.uuid));
                } else if (!isEqual(encode(itemRedux), itemDB)) {
                    //Update redux by dispatching an update
                    yield* putDispatch(actions.upsert(itemDB as T, action.meta.uuid));
                }
            } else if (defaultItem) {
                yield* putDispatch(actions.create(defaultItem as T))
            }

        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        stack: (error as Error).stack,
                        errorMessage: (error as Error).message,
                        type: action.type,
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
            if (items) yield* putDispatch(actions.upsertBatched(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
    const hydrateAllSaga = function* (action: HydrateAllAction) {
        try {
            const items = yield* call(all);
            if (items) yield* putDispatch(actions.updateBatched(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
        } catch (error) {
            yield* putDispatch(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: (error as Error).message,
                        stack: (error as Error).stack,
                        type: action.type,
                    },
                    action.meta.uuid,
                ),
            );
        }
    };

    const crudRootSaga = function* () {
        yield* allSaga([
            takeEvery(actionTypes.CREATE, createSaga),
            takeEvery(actionTypes.CREATE_BATCHED, createBatchedSaga),
            takeEvery(actionTypes.PUT, putSaga),
            takeEvery(actionTypes.PUT_BATCHED, putBatchedSaga),
            takeEvery(actionTypes.UPDATE, updateSaga),
            takeEvery(actionTypes.UPDATE_BATCHED, updateBatchedSaga),
            takeEvery(actionTypes.UPSERT, upsertSaga),
            takeEvery(actionTypes.UPSERT_BATCHED, upsertBatchedSaga),
            takeEvery(actionTypes.DELETE, deleteSaga),
            takeEvery(actionTypes.DELETE_BATCHED, deleteBatchedSaga),
            takeEvery(actionTypes.HYDRATE, hydrateSaga),
            takeEvery(actionTypes.HYDRATE_BATCHED, hydrateBatchedSaga),
            takeEvery(actionTypes.HYDRATE_ALL, hydrateAllSaga),
        ]);
    };

    const sagas = {
        create: createSaga,
        createBatched: createBatchedSaga,
        put: putSaga,
        putBatched: putBatchedSaga,
        update: updateSaga,
        updateBatched: updateBatchedSaga,
        upsert: upsertSaga,
        upsertBatched: upsertBatchedSaga,
        delete: deleteSaga,
        deleteBatched: deleteBatchedSaga,
        hydrate: hydrateSaga,
        hydrateBatched: hydrateBatchedSaga,
        hydrateAll: hydrateAllSaga,
        crudRootSaga,
    };

    /** Dexie Hooks */
    const useGet = (idx: Partial<T_Idx> | string | undefined) => {
        const defined = isDefined(idx);
        const dep = defined ? JSON.stringify(idx) : undefined;

        const response = useLiveQuery(() => (defined ? get(idx) : undefined), [dep], 'loading' as const);
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
                        return isDefined(id);
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
    const useWhere = (
        filter: Partial<T_Idx> | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const filterDep = JSON.stringify(filter);
        const response = useLiveQuery(
            () => (filter && isDefinedRecord(filter) ? where(filter, { reverse, offset, limit }) : []),
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
    const useHydrate = (idx: Partial<T_Idx> | undefined, defaultItem?: T | undefined) => {
        const dispatch = useDispatch();
        const [itemDB] = useGet(idx);
        //Use db item or assume idx is id
        const id = useMemo(() => (itemDB ? validateId(itemDB) : validateId(idx as T_ID)), [idx, itemDB]);
        const itemRedux = useSelectByIdSingle(id);
        const itemReduxExists = !!itemRedux;

        //Reset state
        const action = useMemo(() => {
            if (idx && isDefinedRecord(idx)) {
                return actions.hydrate({ id: idx, defaultItem });
            }
        }, [JSON.stringify(idx), JSON.stringify(defaultItem)]);

        useEffect(() => {
            if (action && !itemReduxExists) {
                dispatch(action);
            }
        }, [dispatch, action, itemReduxExists]);

        const returnValue = itemRedux;
        const exists = itemReduxExists;
        const returnOptions = { exists };

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

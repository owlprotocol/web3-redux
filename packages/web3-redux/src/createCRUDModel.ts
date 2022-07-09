import { Action, createAction as createReduxAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { put as putSaga, call, all as allSaga, takeEvery } from 'typed-redux-saga';
import { useLiveQuery } from 'dexie-react-hooks';
import { IndexableType, IndexableTypeArray } from 'dexie';
import { createSelector } from 'redux-orm';
import { useSelector } from 'react-redux';
import { filter } from './utils/lodash/index.js';
import { create as createError } from './error/actions/create.js';
import getDB from './db.js';
import { getOrm } from './orm.js';
import isStrings from './utils/isStrings.js';

/* Compound indices are joined with separator */
const SEPARATOR = '-';
export function toReduxOrmId(id: string | IndexableTypeArray) {
    if (typeof id === 'string') return id;
    return id.join(SEPARATOR);
}

export function isDefinedRecord<T extends Record<string, any> = Record<string, any>>(t: Partial<T>): t is T {
    //Compound index
    if (Object.values(t).includes(undefined)) {
        //Missing index key, return undefined
        return false;
    }
    return true;
}

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
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    T extends T_Encoded = T_Encoded,
    >(
        name: U,
        validateId: (id: T_ID) => string | IndexableTypeArray = (id: T_ID) => Object.values(id),
        validate: (item: T) => T = (item: T) => item as T,
        hydrate: (item: T, sess?: any) => T = (item: T) => item as T,
        encode: (item: T) => T_Encoded = (item: T) => item as T_Encoded,
) {
    /** Actions */
    const CREATE = `${name}/CREATE`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;
    const UPDATE = `${name}/UPDATE`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;
    const DELETE = `${name}/DELETE`;
    const DELETE_BATCHED = `${DELETE}/BATCHED`;

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

    const actionTypes = {
        CREATE,
        CREATE_BATCHED,
        UPDATE,
        UPDATE_BATCHED,
        DELETE,
        DELETE_BATCHED,
    };

    const actions = {
        create: createAction,
        createBatched: createBatchedAction,
        update: updateAction,
        updateBatched: updateBatchedAction,
        delete: deleteAction,
        deleteBatched: deleteBatchedAction,
    };

    type CreateAction = ReturnType<typeof actions.create>;
    type CreateBatchedAction = ReturnType<typeof actions.createBatched>;
    type UpdateAction = ReturnType<typeof actions.update>;
    type UpdateBatchedAction = ReturnType<typeof actions.updateBatched>;
    type DeleteAction = ReturnType<typeof actions.delete>;
    type DeleteBatchedAction = ReturnType<typeof actions.deleteBatched>;

    const isAction = (action: Action) => {
        return (
            createAction.match(action) ||
            createBatchedAction.match(action) ||
            updateAction.match(action) ||
            updateBatchedAction.match(action) ||
            deleteAction.match(action) ||
            deleteBatchedAction.match(action)
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
            Model.withId(toReduxOrmId(action.payload))?.delete();
        } else if (deleteBatchedAction.match(action)) {
            action.payload.forEach((p) => Model.withId(toReduxOrmId(p))?.delete());
        }
        return sess;
    };

    /** Redux ORM Selectors */
    const select = createSelector(getOrm()[name]);
    const selectByIdSingle = (state: any, id: Partial<T_ID> | string | undefined) => {
        if (!id) return undefined;
        if (typeof id != 'string') {
            if (!isDefinedRecord(id)) return undefined;
            //Validate id & convert to redux orm string id
            return select(state, toReduxOrmId(validateId(id))) as T | undefined;
        } else {
            //redux orm string id
            return select(state, id) as T | undefined;
        }
    };

    const selectByIdMany = (state: any, ids?: (T_ID | string)[]): (T | null)[] => {
        if (!ids) return select(state); //Return all
        if (isStrings(ids)) {
            return select(state, ids);
        } else {
            return select(
                state,
                ids.map((id) => toReduxOrmId(validateId(id as T_ID))),
            );
        }
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
    };

    /** Dexie Getters */
    const get = async (id: Partial<T_ID> | string | undefined) => {
        if (!id) return undefined;
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        if (typeof id != 'string') {
            if (!isDefinedRecord(id)) return undefined;
            return table.get(validateId(id));
        } else {
            return table.get(id);
        }
    };

    const bulkGet = async (id: T_ID[] | string[] | undefined) => {
        if (!id) return undefined;
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        if (isStrings(id)) {
            return table.bulkGet(id);
        } else {
            return table.bulkGet(id.map(validateId));
        }
    };

    const all = async () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = async (filter: Partial<T_Encoded>) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.where(filter).toArray();
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
        return table.update(validateId(item), encode(item));
    };

    const bulkUpdate = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        return db.transaction('rw', table, async () => {
            const promises = items.map((t) => table.update(validateId(t), encode(t)));
            return Promise.all(promises);
        });
    };

    const deleteDB = async (id: IndexableType) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.delete(id);
    };

    const bulkDelete = async (ids: IndexableType[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkDelete(ids);
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
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: CREATE_ERROR,
                }),
            );
        }
    };
    const createBatchedSaga = function* (action: CreateBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkAdd, payload);
        } catch (error) {
            yield* putSaga(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: CREATE_BATCHED_ERROR,
                }),
            );
        }
    };
    const updateSaga = function* (action: UpdateAction) {
        try {
            const { payload } = action;

            yield* call(update, payload);
        } catch (error) {
            yield* putSaga(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: UPDATE_ERROR,
                }),
            );
        }
    };
    const updateBatchedSaga = function* (action: UpdateBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkUpdate, payload);
        } catch (error) {
            yield* putSaga(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: UPDATE_BATCHED_ERROR,
                }),
            );
        }
    };
    const deleteSaga = function* (action: DeleteAction) {
        try {
            const { payload } = action;

            yield* call(deleteDB, payload);
        } catch (error) {
            yield* putSaga(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: DELETE_ERROR,
                }),
            );
        }
    };
    const deleteBatchedSaga = function* (action: DeleteBatchedAction) {
        try {
            const { payload } = action;

            yield* call(bulkDelete, payload);
        } catch (error) {
            yield* putSaga(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: DELETE_BATCHED_ERROR,
                }),
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
        ]);
    };

    const sagas = {
        create: createSaga,
        createBatchedAction: createBatchedSaga,
        update: updateSaga,
        updateBatched: updateBatchedSaga,
        delete: deleteSaga,
        deleteBatched: deleteBatchedSaga,
        crudRootSaga,
    };

    /** Dexie Hooks */
    const useGet = (id: Partial<T_ID> | string | undefined) => {
        if (!id) return undefined;
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const id2 = validateId(id as T_ID);
        const id2Dep = toReduxOrmId(id2);

        //TODO: Undefined compound key?
        return useLiveQuery(() => table.get(id2), [id2Dep]);
    };
    //TODO: string array id
    const useGetBulk = (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const ids2 = ids.map(validateId);
        const ids2Dep = ids.map(validateId).map(toReduxOrmId).join(SEPARATOR);
        return useLiveQuery(() => table.bulkGet(ids2), [ids2Dep]);
    };
    const useWhere = (filter: Partial<T_Encoded>) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const filterDep = JSON.stringify(filter);
        return useLiveQuery(() => table.where(filter).toArray(), [filterDep]);
    };

    /** Redux ORM Hooks */
    const useSelectByIdSingle = (id: Partial<T_ID> | string | undefined) => {
        return useSelector((state) => selectByIdSingle(state, id));
    };
    const useSelectByIdMany = (id?: (T_ID | string)[]) => {
        return useSelector((state) => selectByIdMany(state, id));
    };

    const hooks = {
        useGet,
        useGetBulk,
        useWhere,
        useSelectByIdSingle,
        useSelectByIdMany,
    };

    return {
        name,
        actions,
        actionTypes,
        isAction,
        reducer,
        selectors,
        sagas,
        db,
        hooks,
        validate,
        validateId,
        hydrate,
    };
}

export default createCRUDModel;

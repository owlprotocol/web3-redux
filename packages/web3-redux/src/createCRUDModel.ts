import { createAction as createReduxAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { put, call, all, takeEvery } from 'typed-redux-saga';
import { useLiveQuery } from 'dexie-react-hooks';
import { IndexableType } from 'dexie';
import { create as createError } from './error/actions/create.js';
import getDB from './db.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validateId Validate id to Dexie-supported format, defaults to calling object values.
 * @param validate Validate item that will be inserted, defaults to identity function.
 * @returns
 */
function createCRUDModel<T_ID extends Record<string, any>, T extends T_ID, U extends string>(
    name: U,
    validateId: (id: T_ID) => IndexableType = (id: T_ID) => Object.values(id),
    validate: (item: T) => T = (item: T) => item,
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

    /** Sagas */
    const CREATE_ERROR = `${CREATE}/ERROR`;
    const CREATE_BATCHED_ERROR = `${CREATE_BATCHED}/ERROR`;
    const UPDATE_ERROR = `${UPDATE}/ERROR`;
    const UPDATE_BATCHED_ERROR = `${UPDATE_BATCHED}/ERROR`;
    const DELETE_ERROR = `${DELETE}/ERROR`;
    const DELETE_BATCHED_ERROR = `${DELETE_BATCHED}/ERROR`;

    const createSaga = function* (action: CreateAction) {
        try {
            const { payload } = action;

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].add], payload);
        } catch (error) {
            yield* put(
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

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].bulkAdd], payload);
        } catch (error) {
            yield* put(
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

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].put], payload);
        } catch (error) {
            yield* put(
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

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].bulkPut], payload);
        } catch (error) {
            yield* put(
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

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].delete], payload);
        } catch (error) {
            yield* put(
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

            const db = getDB();
            yield* call([db[name as keyof typeof db], db[name as keyof typeof db].bulkDelete], payload);
        } catch (error) {
            yield* put(
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
        yield* all([
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

    /** Hooks */
    //https://stackoverflow.com/questions/51435783/pick-and-flatten-a-type-signature-in-typescript
    const useGet = (id: Partial<T_ID>) => {
        const db = getDB();
        return useLiveQuery(() => db[name as keyof typeof db].get(id)) as T | undefined;
    };
    const useGetBulk = (id: Partial<T_ID>[]) => {
        const db = getDB();
        return useLiveQuery(() => db[name as keyof typeof db].getBulk(id)) as T[] | undefined;
    };
    const useWhere = (filter: Partial<T>) => {
        const db = getDB();
        return useLiveQuery(() => db[name as keyof typeof db].where(filter)) as T[];
    };

    const hooks = {
        useGet,
        useGetBulk,
        useWhere,
    };

    return { name, actions, sagas, hooks };
}

export default createCRUDModel;

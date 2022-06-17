import { name } from './common.js';
import {
    ReducerAction,
    isCreateAction,
    isCreateBatchedAction,
    isRemoveAction,
    isRemoveBatchedAction,
    isUpdateAction,
    isUpdateBatchedAction,
    isSetAction,
} from './actions/index.js';
import { BlockHeader, getId } from './model/index.js';
import { omit } from '../utils/lodash/index.js';
import { ORMModel, ModelWithId } from '../types/model.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<ModelWithId<BlockHeader>> = sess[name];
    if (isCreateAction(action)) {
        const { payload } = action;
        //transactions created in saga middleware
        Model.upsert(omit(payload, ['transactions']));
    } else if (isCreateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.upsert(item);
        });
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isRemoveBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.withId(getId(item))?.delete();
        });
    } else if (isUpdateAction(action)) {
        const { payload } = action;
        Model.update(omit(payload, ['transactions']));
    } else if (isUpdateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.update(omit(item));
        });
    } else if (isSetAction(action)) {
        Model.withId(getId(action.payload.id))?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

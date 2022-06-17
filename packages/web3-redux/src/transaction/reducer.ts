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
import { getId } from './model/interface.js';

/** @category Selectors */
export function reducer(sess: any, action: ReducerAction) {
    const Model = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
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
        Model.update(payload);
    } else if (isUpdateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.update(item);
        });
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

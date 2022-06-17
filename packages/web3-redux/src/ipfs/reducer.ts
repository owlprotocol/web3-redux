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
import { Ipfs } from './model/interface.js';
import { ORMModel } from '../types/model.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<Ipfs> = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isCreateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.upsert(item);
        });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload.contentId)?.delete();
    } else if (isRemoveBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.withId(item.contentId)?.delete();
        });
    } else if (isUpdateAction(action)) {
        const { payload } = action;
        Model.update(payload);
    } else if (isUpdateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.update(item);
        });
    } else if (isSetAction(action)) {
        Model.withId(action.payload.contentId)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

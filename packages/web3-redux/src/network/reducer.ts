import { name } from './common.js';
import {
    ReducerAction,
    isCreateAction,
    isCreateBatchedAction,
    isRemoveAction,
    isUpdateAction,
    isSetAction,
} from './actions/index.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model = sess[name];
    if (isCreateAction(action) || isUpdateAction(action)) {
        Model.upsert(action.payload);
    } else if (isCreateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.upsert(item);
        });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload)?.delete();
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

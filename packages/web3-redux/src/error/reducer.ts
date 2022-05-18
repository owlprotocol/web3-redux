import { name } from './common.js';
import { ReducerAction, isCreateAction, isRemoveAction } from './actions/index.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload)?.delete();
    }

    return sess;
}

export default reducer;

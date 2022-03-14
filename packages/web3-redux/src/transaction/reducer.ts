import { name } from './common.js';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions/index.js';
import { getId } from './model/interface.js';

/** @category Selectors */
export function reducer(sess: any, action: ReducerAction) {
    const Model = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

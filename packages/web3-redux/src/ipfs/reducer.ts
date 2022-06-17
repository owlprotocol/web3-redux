import { name } from './common.js';
import {
    ReducerAction,
    isCreateAction,
    isCreateBatchedAction,
    isRemoveAction,
    isSetAction,
    isUpdateAction,
    RemoveAction,
    SetAction,
    UpdateAction,
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
        Model.withId((action as RemoveAction).payload.contentId)?.delete();
    } else if (isUpdateAction(action)) {
        Model.update((action as UpdateAction).payload);
    } else if (isSetAction(action)) {
        Model.withId((action as SetAction).payload.contentId)?.set(
            (action as SetAction).payload.key,
            (action as SetAction).payload.value,
        );
    }

    return sess;
}

export default reducer;

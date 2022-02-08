import { name } from './common';
import {
    ReducerAction,
    isCreateAction,
    isRemoveAction,
    isSetAction,
    isUpdateAction,
    RemoveAction,
    SetAction,
    UpdateAction,
} from './actions';
import Ipfs from './model/interface';
import ModelInterface from '../types/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ModelInterface<Ipfs> = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
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

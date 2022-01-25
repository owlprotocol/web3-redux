import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isSetAction, isUpdateAction } from './actions';
import Ipfs, { getId } from './model/interface';
import ModelInterface from '../types/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ModelInterface<Ipfs> = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
    } else if (isSetAction(action)) {
        Model.withId(getId(action.payload.id))?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import ModelInterface from '../types/model';
import EthCall, { getId, validate } from './model/interface';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ModelInterface<EthCall> = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(validate(action.payload));
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(validate(action.payload));
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

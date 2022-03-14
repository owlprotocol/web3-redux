import { name } from './common.js';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions/index.js';
import { _4ByteSignature } from './model/interface.js';
import { ORMModel } from '../types/model.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<_4ByteSignature> = sess[name];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload.signatureHash)?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id.signatureHash)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import _4ByteSignature from './model/interface';
import { ORMModel } from '../types/model';

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

import { omit } from 'lodash';
import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import { BlockHeader, getId } from './model';
import { ORMModel, ModelWithId } from '../types/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<ModelWithId<BlockHeader>> = sess[name];
    if (isCreateAction(action)) {
        const { payload } = action;
        //transactions created in saga middleware
        Model.upsert(omit(payload, ['transactions']));
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isUpdateAction(action)) {
        const { payload } = action;
        Model.update(omit(payload, ['transactions']));
    } else if (isSetAction(action)) {
        Model.withId(getId(action.payload.id))?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

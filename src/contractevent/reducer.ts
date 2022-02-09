import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import ContractEvent, { getId } from './model/interface';
import ContractEventIndex from '../contracteventindex/model/interface';
import { ORMModel, ModelWithId } from '../types/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<ModelWithId<ContractEvent>> = sess[name];
    const Index: ORMModel<ModelWithId<ContractEventIndex>> = sess['ContractEventIndex'];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
        if (action.payload.key === 'indexIds') {
            (action.payload.value as string[])?.forEach((id) => {
                if (!Index.withId(id)) Index.create({ id });
            });
        }
    }

    return sess;
}

export default reducer;

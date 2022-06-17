import { name } from './common.js';
import {
    ReducerAction,
    isCreateAction,
    isCreateBatchedAction,
    isRemoveAction,
    isRemoveBatchedAction,
    isUpdateAction,
    isUpdateBatchedAction,
    isSetAction,
} from './actions/index.js';
import { ContractEvent, getId } from './model/interface.js';
import { ContractEventIndex } from '../contracteventindex/model/interface.js';
import { ORMModel, ModelWithId } from '../types/model.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Model: ORMModel<ModelWithId<ContractEvent>> = sess[name];
    const Index: ORMModel<ModelWithId<ContractEventIndex>> = sess['ContractEventIndex'];
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isCreateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.upsert(item);
            item.indexIds?.forEach((id) => {
                if (!Index.withId(id)) Index.create({ id });
            });
        });
    } else if (isRemoveAction(action)) {
        Model.withId(getId(action.payload))?.delete();
    } else if (isRemoveBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.withId(getId(item))?.delete();
        });
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isUpdateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Model.update(item);
            item.indexIds?.forEach((id) => {
                if (!Index.withId(id)) Index.create({ id });
            });
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

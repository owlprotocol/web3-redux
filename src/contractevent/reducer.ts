import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { validatedContractEvent } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.ContractEvent;
    if (isCreateAction(action)) {
        const validated = validatedContractEvent(action.payload);
        Model.upsert({ ...validated });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    }

    return sess;
}

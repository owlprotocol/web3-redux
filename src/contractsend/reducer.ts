import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { validatedContractSend } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.ContractSend;
    if (isCreateAction(action)) {
        const validated = validatedContractSend(action.payload);
        Model.upsert({ ...validated });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    }

    return sess;
}

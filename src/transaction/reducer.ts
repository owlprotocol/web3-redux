import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { transactionId, validatedTransaction } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Transaction;
    if (isCreateAction(action)) {
        const validated = validatedTransaction(action.payload);
        Model.upsert({ ...validated });
    } else if (isRemoveAction(action)) {
        const id = transactionId(action.payload);
        Model.withId(id).delete();
    }

    return sess;
}

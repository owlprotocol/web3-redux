import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { validatedAccount } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Account;
    if (isCreateAction(action)) {
        const validated = validatedAccount(action.payload);
        Model.upsert({ ...validated });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    }

    return sess;
}

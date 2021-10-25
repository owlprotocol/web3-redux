import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { validatedAccount, accountId } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Account;
    if (isCreateAction(action)) {
        const validated = validatedAccount(action.payload);
        Model.upsert({ ...validated });
    } else if (isRemoveAction(action)) {
        const id = accountId(action.payload);
        Model.withId(id).delete();
    }

    return sess;
}

import { ReducerAction, isCreateAction, isRemoveAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Account;
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    }

    return sess;
}

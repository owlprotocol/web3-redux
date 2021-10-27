import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Account;
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload)?.delete();
    } else if (isUpdateAction(action)) {
        Model.update(action.payload);
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

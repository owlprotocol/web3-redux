import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.EthCall;
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    } else if (isUpdateAction(action)) {
        //@ts-ignore
        Model.update(action.payload);
    }

    return sess;
}

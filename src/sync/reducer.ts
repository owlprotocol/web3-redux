import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess.Sync;
    if (isCreateAction(action)) {
        Model.upsert(action.payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload)?.delete();
    } else if (isUpdateAction(action)) {
        //@ts-expect-error
        Model.update(action.payload);
    }

    return sess;
}

export default reducer;

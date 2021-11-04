import { name } from './common';
import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const Model = sess[name];
    if (isCreateAction(action)) {
        const { payload } = action;
        //transactions created in saga middleware
        const insertData = { ...payload, transactions: undefined };
        //@ts-ignore
        delete insertData.transactions;
        Model.upsert(insertData);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload)?.delete();
    } else if (isUpdateAction(action)) {
        const { payload } = action;
        //transactions created in saga middleware
        const insertData = { ...payload, transactions: undefined };
        //@ts-ignore
        delete insertData.transactions;
        Model.update(action.payload);
    } else if (isSetAction(action)) {
        Model.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

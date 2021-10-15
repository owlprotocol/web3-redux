import invariant from 'tiny-invariant';

import { ReducerAction, isCreateAction, isRemoveAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const { Block } = sess;
    const { payload } = action;
    invariant(payload.id, 'Block.ReducerAction id undefined');
    const id = payload.id;

    if (isCreateAction(action)) {
        //transactions created in saga middleware
        const insertData = { ...payload, transactions: undefined };
        //@ts-ignore
        delete insertData.transactions;
        Block.upsert(insertData);
    } else if (isRemoveAction(action)) {
        Block.withId(id).delete();
    }
    return sess;
}

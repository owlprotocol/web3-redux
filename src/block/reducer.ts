import invariant from 'tiny-invariant';

import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction } from './actions';

export function reducer(sess: any, action: ReducerAction) {
    const { Block } = sess;

    if (isCreateAction(action)) {
        const { payload } = action;
        invariant(payload.id, 'Block.ReducerAction id undefined');
        //transactions created in saga middleware
        const insertData = { ...payload, transactions: undefined };
        //@ts-ignore
        delete insertData.transactions;
        Block.upsert(insertData);
    } else if (isRemoveAction(action)) {
        Block.withId(action.payload).delete();
    } else if (isUpdateAction(action)) {
        //@ts-expect-error
        Block.update(action.payload);
    }

    return sess;
}

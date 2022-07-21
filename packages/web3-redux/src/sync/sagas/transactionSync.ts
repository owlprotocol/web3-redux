import { put, call, all } from 'typed-redux-saga';
import { Action } from 'redux';
import { TransactionSync } from '../model/index.js';
import TransactionCRUD from '../../transaction/crud.js';
import SyncCRUD from '../crud.js';

//Handle on transaction update
function* transactionSync({ payload }: ReturnType<typeof TransactionCRUD.actions.create>) {
    const syncs = (yield* call(SyncCRUD.db.where, { type: 'Transaction' })) as TransactionSync[];

    const actions: Action[] = []; //triggered actions

    syncs.map((s) => {
        if (s.networkId === payload.networkId && (s.matchFrom === payload.from || s.matchTo === payload.to)) {
            actions.push(...s.actions);
        }
    });

    //TODO: Should we instead use fork() or spawn()?
    //Note these are arbitrary actions
    const tasks = actions.map((a) => put(a));
    yield* all(tasks);
}

export default transactionSync;

import { put, select, all } from 'typed-redux-saga';
import { Action } from 'redux';
import { CreateAction } from '../../transaction/actions/index.js';
import { selectByIdMany } from '../selector/index.js';
import { TransactionSync } from '../model/index.js';

//Handle on transaction update
function* transactionSync({ payload }: CreateAction) {
    const syncs: ReturnType<typeof selectByIdMany> = yield* select(selectByIdMany);
    const syncsFiltered = syncs.filter((s) => s?.type === 'Transaction') as TransactionSync[];

    const actions: Action[] = []; //triggered actions

    syncsFiltered.map((s) => {
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
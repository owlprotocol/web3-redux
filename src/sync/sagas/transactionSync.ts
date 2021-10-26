import { put, select, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { CreateAction } from '../../transaction/actions';
import { selectByIdMany } from '../selector';
import { TransactionSync } from '../model';

//Handle on transaction update
function* transactionSync({ payload }: CreateAction) {
    const syncs: ReturnType<typeof selectByIdMany> = yield select(selectByIdMany);
    const syncsFiltered = syncs.filter((s) => !!s && s?.type === 'Transaction') as TransactionSync[];
    const actions: Action[] = [];
    syncsFiltered.map((s) => {
        if (s?.filter(payload)) {
            actions.push(...s.actions);
        }
    });

    const tasks = actions.map((a) => put(a));

    //TODO: Should we instead use fork() or spawn()?
    yield all(tasks);
}

export default transactionSync;

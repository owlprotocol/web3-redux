import { put, select, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { CreateAction } from '../../contractevent/actions';
import { selectByIdMany } from '../selector';
import { EventSync } from '../model';

//Handle on event update
function* eventSync({ payload }: CreateAction) {
    const syncs: ReturnType<typeof selectByIdMany> = yield select(selectByIdMany);
    const syncsFiltered = syncs.filter((s) => !!s && s?.type === 'Event') as EventSync[];
    const actions: Action[] = [];
    syncsFiltered.map((s) => {
        if (s?.filter(payload)) {
            if (typeof s.actions === 'function') {
                actions.push(...s.actions(payload));
            } else {
                actions.push(...s.actions);
            }
        }
    });

    const tasks = actions.map((a) => put(a));

    //TODO: Should we instead use fork() or spawn()?
    yield all(tasks);
}

export default eventSync;
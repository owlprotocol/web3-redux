import { put, select, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { CreateAction } from '../../block/actions';
import { selectByIdMany } from '../selector';
import { BlockSync } from '../model';
import { create } from '../actions';

//Handle on block update
function* blockSync({ payload }: CreateAction) {
    const syncs: ReturnType<typeof selectByIdMany> = yield select(selectByIdMany);
    const syncsFiltered = syncs.filter((s) => !!s && s?.type === 'Block') as BlockSync[];
    const filterActions: Action[] = []; //triggered actions
    const updateActions: Action[] = []; //update cache actions

    syncsFiltered.map((s) => {
        if (s?.filter(payload, s.cache) && s.actions) {
            if (typeof s.actions === 'function') {
                filterActions.push(...s.actions(payload));
            } else {
                filterActions.push(...s.actions);
            }

            if (s?.updateCache) {
                const cache = s.cache;
                const newCache = s.updateCache(payload, cache);
                updateActions.push(create({ ...s, cache: newCache }));
            }
        }
    });

    //Update all syncs
    const updateTasks = updateActions.map((a) => put(a));
    yield all(updateTasks);

    //TODO: Should we instead use fork() or spawn()?
    //Note these are arbitrary actions
    const filterTasks = filterActions.map((a) => put(a));
    yield all(filterTasks);
}

export default blockSync;

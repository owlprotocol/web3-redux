import { put, select, all } from 'typed-redux-saga';
import { Action } from 'redux';
import { CreateAction } from '../../block/actions/index.js';
import { selectByIdMany } from '../selector/index.js';
import { BlockSync } from '../model/index.js';

//Handle on block update
function* blockSync({ payload }: CreateAction) {
    const syncs: ReturnType<typeof selectByIdMany> = yield* select(selectByIdMany);
    const syncsFiltered = syncs.filter((s) => s?.type === 'Block') as BlockSync[];

    const actions: Action[] = []; //triggered actions

    syncsFiltered.map((s) => {
        if (
            s.networkId === payload.networkId &&
            (!s.matchBlockNumberModulo || payload.number % s.matchBlockNumberModulo)
        ) {
            //Block matches
            actions.push(...s.actions);
        }
    });

    //Note these are arbitrary actions
    //TODO: Should we instead use fork() or spawn()?
    const tasks = actions.map((a) => put(a));
    yield* all(tasks);
}

export default blockSync;

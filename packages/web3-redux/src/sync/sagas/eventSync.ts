import { put, call, all } from 'typed-redux-saga';
import { Action } from 'redux';
import { isMatch, reduce } from '../../utils/lodash/index.js';
import { EventSync } from '../model/index.js';
import SyncCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';

//Handle on event update
function* eventSync({ payload }: ReturnType<typeof ContractEventCRUD.actions.create>) {
    const syncs = (yield* call(SyncCRUD.db.where, { type: 'Event' })) as EventSync[];

    const actions: Action[] = []; //triggered actions

    syncs.map((s) => {
        if (s.networkId === payload.networkId && s.matchAddress === payload.address && s.matchName === payload.name) {
            //Event matches name
            if (!s.matchReturnValues) {
                //No filter
                actions.push(...s.actions);
            } else if (
                Array.isArray(s.matchReturnValues) &&
                reduce(
                    payload.returnValues,
                    (acc, curr) => {
                        return acc || isMatch(payload.returnValues, curr);
                    },
                    false,
                )
            ) {
                //Reduce over isMatch (any 1 filter can match)
                actions.push(...s.actions);
            } else if (isMatch(payload.returnValues, s.matchReturnValues)) {
                //Use lodash isMatch
                //https://lodash.com/docs/4.17.15#isMatch
                actions.push(...s.actions);
            }
        }
    });

    //TODO: Should we instead use fork() or spawn()?
    //Note these are arbitrary actions
    const tasks = actions.map((a) => put(a));
    yield* all(tasks);
}

export default eventSync;

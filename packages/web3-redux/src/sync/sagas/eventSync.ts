import { put, call, all } from 'typed-redux-saga';
import { compact, flatten, isMatch, reduce } from '../../utils/lodash/index.js';
import { EventSync } from '../model/index.js';
import SyncCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';

//Handle on event update
function* eventSync({ payload }: ReturnType<typeof ContractEventCRUD.actions.create>) {
    if (!payload.returnValues) return;

    const syncs = (yield* call(SyncCRUD.db.where, { type: 'Event' })) as EventSync[];

    const actions = compact(
        syncs
            .filter(
                (s) =>
                    s.networkId === payload.networkId &&
                    s.matchAddress === payload.address &&
                    s.matchName === payload.name,
            )
            .map((s) => {
                //Event matches name
                if (!s.matchReturnValues) {
                    //No filter
                    return s.actions;
                } else if (
                    Array.isArray(s.matchReturnValues) &&
                    !!payload.returnValues &&
                    reduce(
                        payload.returnValues,
                        (acc, curr) => {
                            return acc || isMatch(payload.returnValues!, curr);
                        },
                        false,
                    )
                ) {
                    //Reduce over isMatch (any 1 filter can match)
                    return s.actions;
                } else if (isMatch(payload.returnValues!, s.matchReturnValues)) {
                    //Use lodash isMatch
                    //https://lodash.com/docs/4.17.15#isMatch
                    return s.actions;
                }
            }),
    );
    const actionsFlat = flatten(actions);

    //TODO: Should we instead use fork() or spawn()?
    //Note these are arbitrary actions
    const tasks = actionsFlat.map((a) => put(a));
    yield* all(tasks);
}

export default eventSync;

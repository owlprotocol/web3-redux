import { all } from 'typed-redux-saga/macro';
import takeEveryBatched from '../../utils/takeEveryBatched';
import { CREATE as CREATE_BLOCK, UPDATE as UPDATE_BLOCK } from '../../block/actions';
import { CREATE as CREATE_TRANSACTION } from '../../transaction/actions';
import { CREATE as CREATE_EVENT } from '../../contractevent/actions';

import blockSync from './blockSync';
import eventSync from './eventSync';
import transactionSync from './transactionSync';

//TODO: Rate-limit or cache block? This can avoid issues if a frontend component is dispatching
// too many actions. However, it is sensible that a block be overwritten or transaction updated.
export function* saga() {
    yield* all([
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_BLOCK), blockSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(UPDATE_BLOCK), blockSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_TRANSACTION), transactionSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_EVENT), eventSync),
    ]);
}

export default saga;

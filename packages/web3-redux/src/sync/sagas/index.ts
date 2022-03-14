import { all } from 'typed-redux-saga';
import blockSync from './blockSync.js';
import eventSync from './eventSync.js';
import transactionSync from './transactionSync.js';
import takeEveryBatched from '../../utils/takeEveryBatched.js';
import { CREATE as CREATE_BLOCK, UPDATE as UPDATE_BLOCK } from '../../block/actions/index.js';
import { CREATE as CREATE_TRANSACTION } from '../../transaction/actions/index.js';
import { CREATE as CREATE_EVENT } from '../../contractevent/actions/index.js';

//TODO: Rate-limit or cache block? This can avoid issues if a frontend component is dispatching
// too many actions. However, it is sensible that a block be overwritten or transaction updated.
/** @internal */
export function* saga() {
    yield* all([
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_BLOCK), blockSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(UPDATE_BLOCK), blockSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_TRANSACTION), transactionSync),
        takeEveryBatched(({ type }: { type: string }) => type.startsWith(CREATE_EVENT), eventSync),
    ]);
}

export default saga;

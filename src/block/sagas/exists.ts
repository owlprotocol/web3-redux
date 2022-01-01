import { select } from 'typed-redux-saga/macro';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { BlockId } from '../model';

/** @category Sagas */
function* exists(id: BlockId) {
    const result: ReturnType<typeof selectByIdSingle> = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

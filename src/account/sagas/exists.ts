import { select } from 'typed-redux-saga/macro';
import { AccountId } from '../model/interface';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';

/** @category Sagas */
function* exists(id: AccountId) {
    const result: ReturnType<typeof selectByIdSingle> = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

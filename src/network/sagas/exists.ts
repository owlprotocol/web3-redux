import { select } from 'typed-redux-saga/macro';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { Id } from '../model/interface';

function* exists(id: Id) {
    const result = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

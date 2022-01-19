import { select } from 'typed-redux-saga/macro';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';

function* exists(id: string) {
    const result = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

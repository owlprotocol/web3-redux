import { select } from 'typed-redux-saga';
import { name } from '../common.js';
import { selectByIdSingle } from '../selectors/index.js';

function* exists(id: string) {
    const result = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

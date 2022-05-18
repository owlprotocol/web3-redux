import { select } from 'typed-redux-saga';
import { name } from '../common.js';
import { selectByIdSingle } from '../selectors/index.js';

function* exists(id: string) {
    const result = yield* select(selectByIdSingle, id);
    if (!result) {
        const error = new Error(`${name} ${id} ${result}`);
        console.error(error);
        throw error;
    }
    return result;
}

export default exists;

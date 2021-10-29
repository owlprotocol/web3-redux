import { select } from 'redux-saga/effects';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { Id } from '../model/interface';

function* exists(id: Id) {
    const result: ReturnType<typeof selectByIdSingle> = yield select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;

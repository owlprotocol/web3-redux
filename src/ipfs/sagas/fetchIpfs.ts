// import { put, call } from 'typed-redux-saga/macro';
import { /*set,*/ FetchIpfsAction } from '../actions';

/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    console.log(action);
    // const { payload } = action;
    // const { contentId } = payload;
}

export default fetchIpfs;

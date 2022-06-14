import { HttpGetAction } from '../actions/index.js';

/** @category Sagas */
export function* httpGet(action: HttpGetAction) {
    const { payload } = action;
    const { url } = payload;
    console.debug(url);
}

export default httpGet;

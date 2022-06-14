import { AxiosResponse } from 'axios';
import invariant from 'tiny-invariant';
import { put, call, select } from 'typed-redux-saga';
import { selectConfig } from '../../config/index.js';
import { create as createError } from '../../error/actions/index.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';

import { create, HttpGetAction, HTTP_GET } from '../actions/index.js';
import selectByIdSingle from '../selectors/selectByIdSingle.js';

const HTTP_GET_ERROR = `${HTTP_GET}/ERROR`;

/** @category Sagas */
export function* httpGet(action: HttpGetAction) {
    const { payload } = action;
    const { url } = payload;
    try {
        invariant(url, 'url undefined!');
        const client = (yield* select(selectConfig)).httpClient;
        invariant(client, 'Http client undefined!');

        const httpCache = yield* select(selectByIdSingle, url);
        if (!httpCache?.data) {
            const response = (yield* call(client.get, url)) as AxiosResponse;
            yield* put(create({ id: url, url, data: response.data }));
        } else {
            throw new Error(`Http ${url} cached!`);
        }
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: HTTP_GET_ERROR,
            }),
        );
    }
}

export function* watchHttpGetSaga() {
    yield takeEveryBuffered(HTTP_GET, httpGet, {
        bufferSize: 20,
        bufferBatchTimeout: 100,
        bufferCompletionTimeout: 1000,
    });
}

export default watchHttpGetSaga;

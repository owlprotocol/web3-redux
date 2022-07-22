import { AxiosResponse } from 'axios';
import invariant from 'tiny-invariant';
import { put, call, select } from 'typed-redux-saga';
import ConfigCRUD from '../../config/crud.js';
import { create as createError } from '../../error/actions/index.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import { HttpGetAction, HTTP_GET } from '../actions/index.js';
import { HTTPCacheCRUD } from '../crud.js';
import { HTTPCache } from '../model/interface.js';

const HTTP_GET_ERROR = `${HTTP_GET}/ERROR`;

/** @category Sagas */
export function* httpGet(action: HttpGetAction) {
    const { payload } = action;
    const { url } = payload;
    try {
        invariant(url, 'url undefined!');
        const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
        const { httpClient, corsProxy } = config ?? {};
        invariant(httpClient, 'Http client undefined!');

        const httpCache = (yield* call(HTTPCacheCRUD.db.get, url)) as HTTPCache | undefined;
        if (!httpCache?.data) {
            try {
                const response = (yield* call(httpClient.get, url)) as AxiosResponse;
                yield* put(HTTPCacheCRUD.actions.upsert({ id: url, url, data: response.data }));
            } catch (error) {
                if (corsProxy) {
                    //TODO: Handle search params
                    //Try with CORS Proxy
                    const urlProxied = `${corsProxy}/${url}`;
                    const response = (yield* call(httpClient.get, urlProxied)) as AxiosResponse;
                    yield* put(HTTPCacheCRUD.actions.upsert({ id: url, url, data: response.data, corsProxied: true }));
                } else {
                    throw error;
                }
            }
        } else {
            //throw new Error(`Http ${url} cached!`);
        }
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: HTTP_GET_ERROR,
                },
                action.meta.uuid,
            ),
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

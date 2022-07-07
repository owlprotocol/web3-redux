import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { httpGet } from './httpGet.js';
import { createAction, httpGet as httpGetAction, HTTP_GET } from '../actions/index.js';
import { selectConfig } from '../../contractevent/config/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { create as createError } from '../../error/actions/index.js';

describe('http/sagas/httpGet.test.ts', () => {
    describe('unit', () => {
        it('fetch - normal', () => {
            const url = 'https://metadata.veefriends.com/collections/series2/tokens/1';
            const client = axios.create();
            const data = JSON.stringify({ name: 'NFT' });

            const action = httpGetAction({ url: 'https://metadata.veefriends.com/collections/series2/tokens/1' });
            testSaga(httpGet, action)
                .next()
                .select(selectConfig)
                .next({ httpClient: client, corsProxy: undefined })
                .select(selectByIdSingle, url)
                .next(undefined)
                .call(client.get, url)
                .next({ data })
                .put(createAction({ id: url, url, data }))
                .next()
                .isDone();
        });

        it('fetch - cors error', () => {
            const url = 'https://metadata.veefriends.com/collections/series2/tokens/1';
            const client = axios.create();
            const data = JSON.stringify({ name: 'NFT' });
            const error = new Error(`Network error ${url}!`);

            const corsProxy = 'http://myproxy.com';
            const urlProxied = `${corsProxy}/${url}`;

            const action = httpGetAction({ url: 'https://metadata.veefriends.com/collections/series2/tokens/1' });
            testSaga(httpGet, action)
                .next()
                .select(selectConfig)
                .next({ httpClient: client, corsProxy })
                .select(selectByIdSingle, url)
                .next(undefined)
                .call(client.get, url)
                .throw(error)
                .call(client.get, urlProxied) //retry with CORS Proxy
                .next({ data })
                .put(createAction({ id: url, url, data, corsProxied: true }))
                .next()
                .isDone();
        });

        it('fetch - cache error', () => {
            const url = 'https://metadata.veefriends.com/collections/series2/tokens/1';
            const client = axios.create();
            const data = JSON.stringify({ name: 'NFT' });
            const HTTP_GET_ERROR = `${HTTP_GET}/ERROR`;
            const error = new Error(`Http ${url} cached!`);

            const action = httpGetAction({ url: 'https://metadata.veefriends.com/collections/series2/tokens/1' });
            testSaga(httpGet, action)
                .next()
                .select(selectConfig)
                .next({ httpClient: client, corsProxy: undefined })
                .select(selectByIdSingle, url)
                .next({ data })
                .put(
                    createError({
                        id: action.meta.uuid,
                        error,
                        errorMessage: (error as Error).message,
                        type: HTTP_GET_ERROR,
                    }),
                )
                .next()
                .isDone();
        });
    });
});

import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { httpGet } from './httpGet.js';
import { httpGet as httpGetAction, HTTP_GET } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import HTTPCacheCRUD from '../crud.js';
import ConfigCRUD from '../../config/crud.js';

describe('http/sagas/httpGet.test.ts', () => {
    describe('unit', () => {
        it('fetch - normal', () => {
            const url = 'https://metadata.veefriends.com/collections/series2/tokens/1';
            const client = axios.create();
            const data = JSON.stringify({ name: 'NFT' });

            const action = httpGetAction({ url: 'https://metadata.veefriends.com/collections/series2/tokens/1' });
            testSaga(httpGet, action)
                .next()
                .select(ConfigCRUD.selectors.selectByIdSingle)
                .next({ httpClient: client, corsProxy: undefined })
                .call(HTTPCacheCRUD.db.get, url)
                .next(undefined)
                .call(client.get, url)
                .next({ data })
                .put(HTTPCacheCRUD.actions.create({ id: url, url, data }))
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
                .select(ConfigCRUD.selectors.selectByIdSingle)
                .next({ httpClient: client, corsProxy })
                .call(HTTPCacheCRUD.db.get, url)
                .next(undefined)
                .call(client.get, url)
                .throw(error)
                .call(client.get, urlProxied) //retry with CORS Proxy
                .next({ data })
                .put(HTTPCacheCRUD.actions.create({ id: url, url, data, corsProxied: true }))
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
                .select(ConfigCRUD.selectors.selectByIdSingle)
                .next({ httpClient: client, corsProxy: undefined })
                .call(HTTPCacheCRUD.db.get, url)
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

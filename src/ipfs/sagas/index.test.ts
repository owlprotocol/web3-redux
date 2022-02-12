import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { name } from '../common';
import { IPFS_HELLO_WORLD } from '../../test/data';
import { selectIpfsUrl } from '../../config';

import { selectByIdSingle } from '../selectors';
import {
    fetchIpfs as fetchIpfsAction,
    create as createAction,
    set as setAction,
    objectGet as objectGetAction,
    cat as catAction,
} from '../actions';

import fetchIpfs from './fetchIpfs';
import objectGet from './objectGet';
import cat from './cat';

describe(`${name}.sagas`, () => {
    describe('cat', () => {
        it('success', async () => {
            const cid = IPFS_HELLO_WORLD;
            const res = await axios.get(`https://ipfs.infura.io:5001/api/v0/cat/${cid}`);

            testSaga(cat, catAction(cid))
                .next()
                .select(selectIpfsUrl)
                .next('https://ipfs.infura.io:5001') //Mock Config.ipfsUrl
                .select(selectByIdSingle, cid) //Check if exists
                .next(undefined)
                .put(createAction({ contentId: cid })) //Create with contentId
                .next()
                .call(axios.get, `https://ipfs.infura.io:5001/api/v0/cat/${cid}`)
                .next(res)
                .put(setAction({ contentId: cid, key: 'data', value: res.data }))
                .next();
        });
    });
    describe('fetchIpfs', () => {
        it('success', async () => {
            const cid = IPFS_HELLO_WORLD;

            testSaga(fetchIpfs, fetchIpfsAction(cid))
                .next()
                .select(selectIpfsUrl)
                .next('https://ipfs.infura.io:5001') //Mock Config.ipfsUrl
                .select(selectByIdSingle, cid) //Check if exists
                .next(undefined)
                .call(objectGet, objectGetAction(cid)) //Get object
                .next()
                .put(catAction(cid)) //Get cat data
                .next();
        });
    });
});

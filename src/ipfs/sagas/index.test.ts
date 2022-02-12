import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { name } from '../common';
import { IPFS_HELLO_WORLD } from '../../test/data';
import { selectIpfsUrl } from '../../config';

import { selectByIdSingle } from '../selectors';
import { fetchIpfs as fetchIpfsAction, create as createAction, set as setAction } from '../actions';

import fetchIpfs from './fetchIpfs';

describe(`${name}.sagas`, () => {
    describe('fetchIpfs', () => {
        it('success', async () => {
            const cid = IPFS_HELLO_WORLD;
            const res = await axios.get(`https://ipfs.infura.io:5001/api/v0/cat/${cid}`);

            testSaga(fetchIpfs, fetchIpfsAction(cid))
                .next()
                .select(selectByIdSingle, cid) //Check if exists
                .next(undefined)
                .put(createAction({ contentId: cid })) //Create with contentId
                .next()
                .select(selectIpfsUrl)
                .next('https://ipfs.infura.io:5001') //Mock Config.ipfsUrl
                .call(axios.get, `https://ipfs.infura.io:5001/api/v0/cat/${cid}`)
                .next(res)
                .put(setAction({ contentId: cid, key: 'data', value: res.data }))
                .next();
        });
    });
});

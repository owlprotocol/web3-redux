import { testSaga } from 'redux-saga-test-plan';

import { name } from '../common';
import { IPFS_HELLO_WORLD } from '../../utils';

import axios from 'axios';
//Actions
import fetchIpfsAction from '../actions/fetchIpfs';

import setAction from '../actions/set';

//Sagas
import fetchIpfs from './fetchIpfs';

describe(`${name}.sagas`, () => {
    const item = { contentId: IPFS_HELLO_WORLD };

    describe('fetchIpfs', () => {
        it('success', async () => {
            const res = await axios.get(`https://ipfs.infura.io:5001/api/v0/cat/${IPFS_HELLO_WORLD}`);

            testSaga(fetchIpfs, fetchIpfsAction(item))
                .next()
                .call(axios.get, `https://ipfs.infura.io:5001/api/v0/cat/${item.contentId}`)
                .next(res)
                .put(setAction({ contentId: IPFS_HELLO_WORLD, key: 'data', value: res.data }))
                .next();
        });
    });
});

import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { name } from '../common';
import { IPFS_HELLO_WORLD } from '../../utils';
import { selectIpfsUrl } from '../../config';

import { selectByIdSingle } from '../selectors';
import { fetchIpfs as fetchIpfsAction, create as createAction, set as setAction } from '../actions';

import fetchIpfs from './fetchIpfs';

describe(`${name}.sagas`, () => {
    const item = { contentId: IPFS_HELLO_WORLD };

    describe('fetchIpfs', () => {
        it('success', async () => {
            const res = await axios.get(`https://ipfs.infura.io:5001/api/v0/cat/${IPFS_HELLO_WORLD}`);

            testSaga(fetchIpfs, fetchIpfsAction(item))
                .next()
                .select(selectByIdSingle, item.contentId) //Check if exists
                .next(undefined)
                .put(createAction({ contentId: item.contentId })) //Create with contentId
                .next()
                .select(selectIpfsUrl)
                .next('https://ipfs.infura.io:5001') //Mock Config.ipfsUrl
                .call(axios.get, `https://ipfs.infura.io:5001/api/v0/cat/${item.contentId}`)
                .next(res)
                .put(setAction({ contentId: IPFS_HELLO_WORLD, key: 'data', value: res.data }))
                .next();
        });
    });
});

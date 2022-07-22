import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import * as moxios from 'moxios';
import { fetchFunctionSignature } from './fetchFunctionSignature.js';
import { networkId } from '../../test/data.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';

//Actions
import { fetchFunctionSignatureAction } from '../actions/fetchFunctionSignature.js';
import _4ByteCRUD from '../crud.js';
import ConfigCRUD from '../../config/crud.js';

//Sagas

describe('4byte/sagas/fetchFunctionSignature.test.ts', () => {
    const ApprovePreImage = 'approve(address,uint256)';
    const AppoveSignature = '0x095ea7b3';
    const expectedResponse = {
        count: 2,
        next: null,
        previous: null,
        results: [
            {
                id: 165138,
                created_at: '2019-09-10T17:02:48.483924Z',
                text_signature: 'sign_szabo_bytecode(bytes16,uint128)',
                hex_signature: '0x095ea7b3',
                bytes_signature: '\t^§³',
            },
            {
                id: 149,
                created_at: '2016-07-09T03:58:29.617584Z',
                text_signature: 'approve(address,uint256)',
                hex_signature: '0x095ea7b3',
                bytes_signature: '\t^§³',
            },
        ],
    };
    const eventItem = { networkId, signatureHash: AppoveSignature };
    const client = axios.create({ baseURL: 'https://www.4byte.directory/api/v1' });
    const requestUrl = `/signatures/?hex_signature=${AppoveSignature}`;

    before(async () => {
        //Moxios install
        moxios.install(client);
        moxios.stubRequest(requestUrl, {
            status: 200,
            response: expectedResponse,
        });
    });

    after(() => {
        moxios.uninstall(client);
    });

    it('testSaga()', async () => {
        testSaga(fetchFunctionSignature, fetchFunctionSignatureAction(eventItem))
            .next()
            .select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' })
            .next({ _4byteClient: client })
            .call(_4ByteCRUD.db.get, eventItem.signatureHash) //Check if exists
            .next(undefined)
            .put(_4ByteCRUD.actions.create({ signatureHash: eventItem.signatureHash })) //Create with signatureHash
            .next()
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(_4ByteCRUD.actions.update({ signatureHash: eventItem.signatureHash, preImage: ApprovePreImage }))
            .next();
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            store = createStore();
            store.dispatch(ConfigCRUD.actions.update({ id: '0', _4byteClient: client }));
        });

        it('fetchFunctionSignature()', async () => {
            store.dispatch(fetchFunctionSignatureAction(eventItem));
            await sleep(100);

            const item = await _4ByteCRUD.db.get(eventItem.signatureHash);
            assert.equal(item!.preImage, ApprovePreImage, 'preImage');
        });
    });
});

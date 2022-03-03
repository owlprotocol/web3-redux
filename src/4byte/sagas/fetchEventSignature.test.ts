import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import moxios from 'moxios';
import { networkId } from '../../test/data';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { selectByIdSingle } from '../selectors';
import { selectConfig } from '../../config/selectors';
import { update as updateConfig } from '../../config/actions';

//Actions
import createAction from '../actions/create';
import fetchEventSignatureAction from '../actions/fetchEventSignature';
import setAction from '../actions/set';

//Sagas
import fetchEventSignature from './fetchEventSignature';

describe('4byte/sagas/fetchEventSignature.test.ts', () => {
    const TransferPreImage = 'Transfer(address,address,uint256)';
    const TransferSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    const expectedResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
            {
                id: 1,
                created_at: '2020-11-30T22:38:00.801049Z',
                text_signature: 'Transfer(address,address,uint256)',
                hex_signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                bytes_signature: 'ÝòR­\u001bâÈiÂ°hü7ª+§ñcÄ¡\u0016(õZMõ#³ï',
            },
        ],
    };
    const eventItem = { networkId, signatureHash: TransferSignature };
    const client = axios.create({ baseURL: 'https://www.4byte.directory/api/v1' });
    const requestUrl = `/event-signatures/?hex_signature=${TransferSignature}`;

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
        testSaga(fetchEventSignature, fetchEventSignatureAction(eventItem))
            .next()
            .select(selectConfig)
            .next({ _4byteClient: client })
            .select(selectByIdSingle, eventItem.signatureHash) //Check if exists
            .next(undefined)
            .put(createAction({ signatureHash: eventItem.signatureHash })) //Create with signatureHash
            .next()
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(setAction({ id: eventItem, key: 'preImage', value: TransferPreImage }))
            .next();
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(updateConfig({ id: '0', _4byteClient: client }));
        });

        it('fetchEventSignature()', async () => {
            store.dispatch(fetchEventSignatureAction(eventItem));
            await sleep(100);

            const item = selectByIdSingle(store.getState(), eventItem.signatureHash);
            assert.equal(item!.preImage, TransferPreImage, 'preImage');
        });
    });
});

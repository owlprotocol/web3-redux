import { assert } from 'chai';

import { createStore, StoreType } from '../store';

import { name } from './common';
import { selectByIdSingle } from './selectors';

import { _4ByteSignature } from './model/interface';

import createAction from './actions/create';
import fetchEventSignatureAction from './actions/fetchEventSignature';
// import fetchEventSignatureSyncedAction from './actions/fetchEventSignatureSynced';
import fetchFunctionSignatureAction from './actions/fetchFunctionSignature';
import axios from 'axios';

describe(`${name}/integration`, () => {
    let store: StoreType;

    const networkId = '1337';

    const _4BYTE_EVENT_URL = 'https://www.4byte.directory/api/v1/event-signatures/?hex_signature=';
    const _4BYTE_FUNCTION_URL = 'https://www.4byte.directory/api/v1/signatures/?hex_signature=';

    const TRANFER_EVENT_KECCAK = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    const APPROVE_FUNCTION_ENCODED = '0x095ea7b3';

    const eventItem: _4ByteSignature = { networkId, signatureHash: TRANFER_EVENT_KECCAK };
    const functionItem: _4ByteSignature = { networkId, signatureHash: APPROVE_FUNCTION_ENCODED };

    beforeEach(() => {
        store = createStore();
        store.dispatch(createAction(eventItem));
        store.dispatch(createAction(functionItem));
    });

    it('fetchEventSignature()', async () => {
        store.dispatch(fetchEventSignatureAction(eventItem));
        const expectedObj = await axios.get(`${_4BYTE_EVENT_URL}${eventItem.signatureHash}`);
        await new Promise((res) => setTimeout(res, 5000));
        const expectedSignature = expectedObj.data.results[0].text_signature;
        const expectName: string = expectedSignature?.substring(0, expectedSignature.indexOf('('));
        const expectArgs: string[] = expectedSignature
            ?.substring(expectedSignature.indexOf('(') + 1, expectedSignature.indexOf(')'))
            .split(',');
        const item = selectByIdSingle(store.getState(), eventItem);
        assert.equal(item!.name, expectName, 'event name');
        assert.deepEqual(item!.args, expectArgs, 'event args');
    });

    it('fetchFunctionSignature()', async () => {
        store.dispatch(fetchFunctionSignatureAction(functionItem));
        const expectedObj = await axios.get(`${_4BYTE_FUNCTION_URL}${functionItem.signatureHash}`);
        await new Promise((res) => setTimeout(res, 5000));
        const expectedSignature = expectedObj.data.results.reduce((prev: any, curr: any) =>
            prev.id < curr.id ? prev : curr,
        ).text_signature;
        const expectName: string = expectedSignature?.substring(0, expectedSignature.indexOf('('));
        const expectArgs: string[] = expectedSignature
            ?.substring(expectedSignature.indexOf('(') + 1, expectedSignature.indexOf(')'))
            .split(',');
        const item = selectByIdSingle(store.getState(), functionItem);
        assert.equal(item!.name, expectName, 'function name');
        assert.deepEqual(item!.args, expectArgs, 'function args');
    });
});

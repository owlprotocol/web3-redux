import { testSaga } from 'redux-saga-test-plan';

import createSync from '../../sync/actions/create';

import { name } from '../common';

import axios, { AxiosResponse } from 'axios';
//Actions
import fetchEventSignatureAction from '../actions/fetchEventSignature';
import fetchFunctionSignatureAction from '../actions/fetchFunctionSignature';
import fetchEventSignatureSyncedAction from '../actions/fetchEventSignatureSynced';
import fetchFunctionSignatureSyncedAction from '../actions/fetchFunctionSignatureSynced';

import setAction from '../actions/set';

//Sagas
import fetchEventSignature from './fetchEventSignature';
import fetchEventSignatureSynced from './fetchEventSignatureSynced';
import fetchFunctionSignature from './fetchFunctionSignature';
import fetchFunctionSignatureSynced from './fetchFunctionSignatureSynced';

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

describe(`${name}.sagas`, () => {
    const networkId = '1337';

    const TRANFER_EVENT_KECCAK = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    const eventItem = { networkId, signatureHash: TRANFER_EVENT_KECCAK };

    const APPROVE_FUNCTION_ENCODED = '0x095ea7b3';
    const functionItem = { networkId, signatureHash: APPROVE_FUNCTION_ENCODED };

    describe('fetchEventSignature', () => {
        it('success', async () => {
            const _4BYTE_EVENT_URL = 'https://www.4byte.directory/api/v1/event-signatures/?hex_signature=';

            const eventSigRes = await axios.get(`${_4BYTE_EVENT_URL}${TRANFER_EVENT_KECCAK}`);
            const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;
            const eventName: string | undefined = eventSig?.substring(0, eventSig.indexOf('('));
            const args: string[] | undefined = eventSig
                ?.substring(eventSig.indexOf('(') + 1, eventSig.indexOf(')'))
                .split(',');

            testSaga(fetchEventSignature, fetchEventSignatureAction(eventItem))
                .next()
                .call(axios.get, `${_4BYTE_EVENT_URL}${eventItem.signatureHash}`)
                .next(eventSigRes)
                .put(setAction({ id: eventItem, key: 'name', value: eventName }))
                .next()
                .put(setAction({ id: eventItem, key: 'args', value: args }))
                .next();
        });
    });

    describe('fetchFunctionSignature', () => {
        it('success', async () => {
            const _4BYTE_FUNCTION_URL = 'https://www.4byte.directory/api/v1/signatures/?hex_signature=';

            const functionSigRes = await axios.get(`${_4BYTE_FUNCTION_URL}${APPROVE_FUNCTION_ENCODED}`);
            const functionSigResArr: _4ByteResponseItem[] | undefined = (functionSigRes as AxiosResponse).data?.results;
            //get functionSig with lowest id
            const functionSig: string | undefined = functionSigResArr?.reduce((prev, curr) =>
                prev.id < curr.id ? prev : curr,
            ).text_signature;
            const funcName: string | undefined = functionSig?.substring(0, functionSig?.indexOf('('));
            const args: string[] | undefined = functionSig
                ?.substring(functionSig?.indexOf('(') + 1, functionSig?.indexOf(')'))
                .split(',');

            testSaga(fetchFunctionSignature, fetchFunctionSignatureAction(functionItem))
                .next()
                .call(axios.get, `${_4BYTE_FUNCTION_URL}${APPROVE_FUNCTION_ENCODED}`)
                .next(functionSigRes)
                .put(setAction({ id: functionItem, key: 'name', value: funcName }))
                .next()
                .put(setAction({ id: functionItem, key: 'args', value: args }));
        });
    });

    describe('fetchEventSignatureSynced', async () => {
        it('success', () => {
            const action = fetchEventSignatureSyncedAction({ ...eventItem, sync: true });
            testSaga(fetchEventSignatureSynced, action)
                .next()
                .put(action.payload.fetchEventSignatureAction)
                .next(createSync(action.payload.sync!));
        });
    });

    describe('fetchFunctionSignatureSynced', async () => {
        it('success', () => {
            const action = fetchFunctionSignatureSyncedAction({ ...functionItem, sync: true });
            testSaga(fetchFunctionSignatureSynced, action)
                .next()
                .put(action.payload.fetchFunctionSignatureAction)
                .next()
                .put(createSync(action.payload.sync!));
        });
    });
});

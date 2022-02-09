import { testSaga } from 'redux-saga-test-plan';
import axios, { AxiosResponse } from 'axios';
import { name } from '../common';
import { networkId } from '../../test/data';

import { selectByIdSingle } from '../selectors';

//Actions
import createAction from '../actions/create';
import fetchEventSignatureAction from '../actions/fetchEventSignature';
import fetchFunctionSignatureAction from '../actions/fetchFunctionSignature';
import setAction from '../actions/set';

//Sagas
import fetchEventSignature from './fetchEventSignature';
import fetchFunctionSignature from './fetchFunctionSignature';

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

describe(`${name}.sagas`, () => {
    const TRANFER_EVENT_KECCAK = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    const eventItem = { networkId, signatureHash: TRANFER_EVENT_KECCAK };

    const APPROVE_FUNCTION_ENCODED = '0x095ea7b3';
    const functionItem = { networkId, signatureHash: APPROVE_FUNCTION_ENCODED };

    describe('fetchEventSignature', () => {
        it('success', async () => {
            const _4BYTE_EVENT_URL = 'https://www.4byte.directory/api/v1/event-signatures/?hex_signature=';

            const eventSigRes = await axios.get(`${_4BYTE_EVENT_URL}${TRANFER_EVENT_KECCAK}`);
            const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

            testSaga(fetchEventSignature, fetchEventSignatureAction(eventItem))
                .next()
                .select(selectByIdSingle, eventItem.signatureHash) //Check if exists
                .next(undefined)
                .put(createAction({ signatureHash: eventItem.signatureHash })) //Create with signatureHash
                .next()
                .call(axios.get, `${_4BYTE_EVENT_URL}${eventItem.signatureHash}`)
                .next(eventSigRes)
                .put(setAction({ id: eventItem, key: 'preImage', value: eventSig }))
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

            testSaga(fetchFunctionSignature, fetchFunctionSignatureAction(functionItem))
                .next()
                .select(selectByIdSingle, functionItem.signatureHash) //Check if exists
                .next(undefined)
                .put(createAction({ signatureHash: functionItem.signatureHash })) //Create with signatureHash
                .next()
                .call(axios.get, `${_4BYTE_FUNCTION_URL}${APPROVE_FUNCTION_ENCODED}`)
                .next(functionSigRes)
                .put(setAction({ id: functionItem, key: 'preImage', value: functionSig }));
        });
    });
});

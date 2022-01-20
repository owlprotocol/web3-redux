import { put, call } from 'typed-redux-saga/macro';
import { set, FetchFunctionSignatureAction } from '../actions';
import axios, { AxiosResponse } from 'axios';

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

/** @category Sagas */
export function* fetchFunctionSignature(action: FetchFunctionSignatureAction) {
    const { payload } = action;
    const { networkId, signatureHash } = payload;

    const eventSigRes = yield* call(
        axios.get,
        `https://www.4byte.directory/api/v1/signatures/?hex_signature=${signatureHash}`,
    );
    const eventSigResArr: _4ByteResponseItem[] | undefined = (eventSigRes as AxiosResponse).data?.results;

    if (eventSigResArr === undefined) throw new Error('This event signature is not found in the 4Byte database');

    const eventSig: string | undefined = eventSigResArr?.reduce((prev, curr) =>
        prev.id < curr.id ? prev : curr,
    ).text_signature;

    const funcName: string = eventSig?.substring(0, eventSig.indexOf('('));
    const args: string[] = eventSig?.substring(eventSig.indexOf('(') + 1, eventSig.indexOf(')')).split(',');

    yield* put(set({ id: { networkId, signatureHash }, key: 'name', value: funcName }));
    yield* put(set({ id: { networkId, signatureHash }, key: 'args', value: args }));
}

export default fetchFunctionSignature;

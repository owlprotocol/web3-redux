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

    const functionSigRes = yield* call(
        axios.get,
        `https://www.4byte.directory/api/v1/signatures/?hex_signature=${signatureHash}`,
    );
    const functionSigResArr: _4ByteResponseItem[] | undefined = (functionSigRes as AxiosResponse).data?.results;

    if (functionSigResArr === undefined) throw new Error('This function signature was not found in the 4Byte database');

    //get functionSig with lowest id
    const functionSig: string | undefined = functionSigResArr?.reduce((prev, curr) =>
        prev.id < curr.id ? prev : curr,
    ).text_signature;

    const funcName: string = functionSig?.substring(0, functionSig.indexOf('('));
    const args: string[] = functionSig?.substring(functionSig.indexOf('(') + 1, functionSig.indexOf(')')).split(',');

    yield* put(set({ id: { networkId, signatureHash }, key: 'name', value: funcName }));
    yield* put(set({ id: { networkId, signatureHash }, key: 'args', value: args }));
}

export default fetchFunctionSignature;

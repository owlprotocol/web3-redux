import { put, call, select } from 'typed-redux-saga/macro';
import axios, { AxiosResponse } from 'axios';
import { set, create, FetchFunctionSignatureAction } from '../actions';
import { selectByIdSingle } from '../selectors';

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
    const { signatureHash } = payload;

    //Check if preImage exists
    const preImage = yield* select(selectByIdSingle, signatureHash);
    if (!preImage) yield* put(create({ signatureHash }));

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

    yield* put(set({ id: { signatureHash }, key: 'preImage', value: functionSig }));
}

export default fetchFunctionSignature;

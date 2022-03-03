import { put, call, select } from 'typed-redux-saga/macro';
import invariant from 'tiny-invariant';
import { AxiosResponse } from 'axios';

import { selectConfig } from '../../config/selectors';
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

    const client = (yield* select(selectConfig))._4byteClient;
    invariant(client, '4byte client undefined!');

    //Check if preImage exists
    const preImage = yield* select(selectByIdSingle, signatureHash);
    if (!preImage) yield* put(create({ signatureHash }));

    const functionSigRes = yield* call(client.get, `/signatures/?hex_signature=${signatureHash}`);
    const functionSigResArr: _4ByteResponseItem[] | undefined = (functionSigRes as AxiosResponse).data?.results;

    if (functionSigResArr === undefined) throw new Error('This function signature was not found in the 4Byte database');

    //get functionSig with lowest id
    const functionSig: string | undefined = functionSigResArr?.reduce((prev, curr) =>
        prev.id < curr.id ? prev : curr,
    ).text_signature;

    yield* put(set({ id: { signatureHash }, key: 'preImage', value: functionSig }));
}

export default fetchFunctionSignature;

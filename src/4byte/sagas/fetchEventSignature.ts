import { put, call, select } from 'typed-redux-saga/macro';
import axios, { AxiosResponse } from 'axios';
import { set, create, FetchEventSignatureAction } from '../actions';
import { selectByIdSingle } from '../selectors';

/** @category Sagas */
export function* fetchEventSignature(action: FetchEventSignatureAction) {
    const { payload } = action;
    const { signatureHash } = payload;

    //Check if preImage exists
    const preImage = yield* select(selectByIdSingle, signatureHash);
    if (!preImage) yield* put(create({ signatureHash }));

    const eventSigRes = yield* call(
        axios.get,
        `https://www.4byte.directory/api/v1/event-signatures/?hex_signature=${signatureHash}`,
    );
    const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

    if (eventSig === undefined) throw new Error('This event signature was not found in the 4Byte database');

    yield* put(set({ id: { signatureHash }, key: 'preImage', value: eventSig }));
}

export default fetchEventSignature;

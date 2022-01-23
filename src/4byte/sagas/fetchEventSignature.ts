import { put, call } from 'typed-redux-saga/macro';
import { set, FetchEventSignatureAction } from '../actions';
import axios, { AxiosResponse } from 'axios';

/** @category Sagas */
export function* fetchEventSignature(action: FetchEventSignatureAction) {
    const { payload } = action;
    const { networkId, signatureHash } = payload;

    const eventSigRes = yield* call(
        axios.get,
        `https://www.4byte.directory/api/v1/event-signatures/?hex_signature=${signatureHash}`,
    );
    const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

    if (eventSig === undefined) throw new Error('This event signature was not found in the 4Byte database');

    const eventName: string = eventSig?.substring(0, eventSig.indexOf('('));
    const args: string[] = eventSig?.substring(eventSig.indexOf('(') + 1, eventSig.indexOf(')')).split(',');

    yield* put(set({ id: { networkId, signatureHash }, key: 'name', value: eventName }));
    yield* put(set({ id: { networkId, signatureHash }, key: 'args', value: args }));
}

export default fetchEventSignature;

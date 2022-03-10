import { put, call, select } from 'typed-redux-saga/macro';
import invariant from 'tiny-invariant';
import { AxiosResponse } from 'axios';

import { selectConfig } from '../../config/selectors/index.js';
import { set, create, FetchEventSignatureAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* fetchEventSignature(action: FetchEventSignatureAction) {
    const { payload } = action;
    const { signatureHash } = payload;

    const client = (yield* select(selectConfig))._4byteClient;
    invariant(client, '4byte client undefined!');

    //Check if preImage exists
    const preImage = yield* select(selectByIdSingle, signatureHash);
    if (!preImage) yield* put(create({ signatureHash }));

    const eventSigRes = yield* call(client.get, `/event-signatures/?hex_signature=${signatureHash}`);
    const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

    if (eventSig === undefined) throw new Error('This event signature was not found in the 4Byte database');

    yield* put(set({ id: { signatureHash }, key: 'preImage', value: eventSig }));
}

export default fetchEventSignature;

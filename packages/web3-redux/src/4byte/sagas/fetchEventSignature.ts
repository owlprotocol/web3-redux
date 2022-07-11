import { put, call, select } from 'typed-redux-saga';
import { AxiosResponse } from 'axios';
import { create as createError } from '../../error/actions/create.js';
import { FetchEventSignatureAction, FETCH_EVENT_SIGNATURE } from '../actions/index.js';

import ConfigCRUD from '../../config/crud.js';
import _4ByteCRUD from '../crud.js';

const FETCH_EVENT_SIGNATURE_ERROR = `${FETCH_EVENT_SIGNATURE}/ERROR`;

/** @category Sagas */
export function* fetchEventSignature(action: FetchEventSignatureAction) {
    try {
        const { payload } = action;
        const { signatureHash } = payload;

        const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
        const client = config?._4byteClient;
        if (!client) throw new Error('4byte client undefined!');

        //Check if preImage exists
        const preImage = yield* select(_4ByteCRUD.selectors.selectByIdSingle, { signatureHash });
        if (!preImage) yield* put(_4ByteCRUD.actions.create({ signatureHash, signatureType: 'Event' }));

        const eventSigRes = yield* call(client.get, `/event-signatures/?hex_signature=${signatureHash}`);
        const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

        if (eventSig === undefined) throw new Error('This event signature was not found in the 4Byte database');

        yield* put(_4ByteCRUD.actions.update({ signatureHash, signatureType: 'Event', preImage: eventSig }));
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: FETCH_EVENT_SIGNATURE_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default fetchEventSignature;

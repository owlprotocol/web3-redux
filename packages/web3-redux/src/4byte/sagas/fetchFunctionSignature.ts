import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { AxiosResponse } from 'axios';

import { create as createError } from '../../error/actions/create.js';
import { FetchFunctionSignatureAction, FETCH_FUNCTION_SIGNATURE } from '../actions/index.js';
import _4ByteCRUD from '../crud.js';
import loadConfig from '../../config/sagas/loadConfig.js';

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

const FETCH_FUNCTION_SIGNATURE_ERROR = `${FETCH_FUNCTION_SIGNATURE}/ERROR`;

/** @category Sagas */
export function* fetchFunctionSignature(action: FetchFunctionSignatureAction) {
    try {
        const { payload } = action;
        const { signatureHash } = payload;

        const config = yield* call(loadConfig, action.meta.uuid);
        const client = config?._4byteClient;
        invariant(client, '4byte client undefined!');

        //Check if preImage exists
        const preImage = yield* select(_4ByteCRUD.selectors.selectByIdSingle, { signatureHash });
        if (!preImage) {
            const functionSigRes = yield* call(client.get, `/signatures/?hex_signature=${signatureHash}`);
            const functionSigResArr: _4ByteResponseItem[] | undefined = (functionSigRes as AxiosResponse).data?.results;

            if (functionSigResArr === undefined)
                throw new Error('This function signature was not found in the 4Byte database');

            //get functionSig with lowest id
            const functionSig: string | undefined = functionSigResArr?.reduce((prev, curr) =>
                prev.id < curr.id ? prev : curr,
            ).text_signature;

            yield* put(_4ByteCRUD.actions.upsert({ signatureHash, signatureType: 'Function', preImage: functionSig }));
        }
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: FETCH_FUNCTION_SIGNATURE_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default fetchFunctionSignature;

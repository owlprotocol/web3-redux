import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { SignatureId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchFunctionSignature } from './fetchFunctionSignature';

/** @internal */
export const FETCH_FUNCTION_SIGNATURE_SYNCED = `${name}/FETCH_FUNCTION_SIGNATURE_SYNCED`;
/** @internal */
export interface FetchFunctionSignatureSyncedActionInput extends SignatureId {
    sync?: Sync | Sync['type'] | boolean | number;
}
/** @category Actions */
export const fetchFunctionSignatureSynced = createAction(
    FETCH_FUNCTION_SIGNATURE_SYNCED,
    (payload: FetchFunctionSignatureSyncedActionInput) => {
        const { networkId, signatureHash } = payload;
        const fetchFunctionSignatureAction = fetchFunctionSignature({ networkId, signatureHash });
        //Default sync
        let sync: Sync | undefined;

        if (payload.sync === false) {
            sync = undefined;
        } else if (!payload.sync || payload.sync === true) {
            //undefined, default as true
            sync = defaultTransactionSync(networkId, signatureHash, [fetchFunctionSignatureAction]);
        } else if (payload.sync === 'Transaction') {
            sync = defaultTransactionSync(networkId, signatureHash, [fetchFunctionSignatureAction]);
        } else if (payload.sync === 'Block') {
            sync = defaultBlockSync(networkId, [fetchFunctionSignatureAction]);
        } else if (payload.sync === 'Event') {
            sync = defaultEventSync([fetchFunctionSignatureAction]);
        } else if (typeof payload.sync === 'number') {
            sync = moduloBlockSync(networkId, payload.sync, [fetchFunctionSignatureAction]);
        } else {
            sync = payload.sync;
            sync.actions = [fetchFunctionSignatureAction];
        }

        if (sync) sync.id = `${sync.type}-${getId({ networkId, signatureHash })}-fetchFunctionSignature`;

        return { payload: { networkId, signatureHash, sync, fetchFunctionSignatureAction } };
    },
);
/** @internal */
export type FetchFunctionSignatureSyncedAction = ReturnType<typeof fetchFunctionSignatureSynced>;
/** @internal */
export const isFetchFunctionSignatureSyncedAction = fetchFunctionSignatureSynced.match;

export default fetchFunctionSignatureSynced;

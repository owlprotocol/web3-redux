import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { SignatureId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchEventSignature } from './fetchEventSignature';

/** @internal */
export const FETCH_EVENT_SIGNATURE_SYNCED = `${name}/FETCH_EVENT_SIGNATURE_SYNCED`;
/** @internal */
export interface FetchEventSignatureSyncedActionInput extends SignatureId {
    sync?: Sync | Sync['type'] | boolean | number;
}
/** @category Actions */
export const fetchEventSignatureSynced = createAction(
    FETCH_EVENT_SIGNATURE_SYNCED,
    (payload: FetchEventSignatureSyncedActionInput) => {
        const { networkId, signatureHash } = payload;
        const fetchEventSignatureAction = fetchEventSignature({ networkId, signatureHash });
        //Default sync
        let sync: Sync | undefined;

        if (payload.sync === false) {
            sync = undefined;
        } else if (!payload.sync || payload.sync === true) {
            //undefined, default as true
            sync = defaultTransactionSync(networkId, signatureHash, [fetchEventSignatureAction]);
        } else if (payload.sync === 'Transaction') {
            sync = defaultTransactionSync(networkId, signatureHash, [fetchEventSignatureAction]);
        } else if (payload.sync === 'Block') {
            sync = defaultBlockSync(networkId, [fetchEventSignatureAction]);
        } else if (payload.sync === 'Event') {
            sync = defaultEventSync([fetchEventSignatureAction]);
        } else if (typeof payload.sync === 'number') {
            sync = moduloBlockSync(networkId, payload.sync, [fetchEventSignatureAction]);
        } else {
            sync = payload.sync;
            sync.actions = [fetchEventSignatureAction];
        }

        if (sync) sync.id = `${sync.type}-${getId({ networkId, signatureHash })}-fetchEventSignature`;

        return { payload: { networkId, signatureHash, sync, fetchEventSignatureAction } };
    },
);
/** @internal */
export type FetchEventSignatureSyncedAction = ReturnType<typeof fetchEventSignatureSynced>;
/** @internal */
export const isFetchEventSignatureSyncedAction = fetchEventSignatureSynced.match;

export default fetchEventSignatureSynced;

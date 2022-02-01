import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { ContractId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { getNonce } from './getNonce';
import { toChecksumAddress } from 'web3-utils';

/** @internal */
export const GET_NONCE_SYNCED = `${name}/GET_NONCE_SYNCED`;
/** @internal */
export interface GetNonceSyncedActionInput extends ContractId {
    sync?: Sync | 'Block' | 'Transaction' | 'once' | number;
}
/** @category Actions */
export const getNonceSynced = createAction(GET_NONCE_SYNCED, (payload: GetNonceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const fetchNonceAction = getNonce(payload);
    //Default sync
    let sync: Sync | undefined;

    if (!payload.sync || payload.sync === 'once') {
        sync = undefined;
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [fetchNonceAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [fetchNonceAction]);
    } else if (typeof payload.sync === 'number') {
        sync = moduloBlockSync(networkId, payload.sync, [fetchNonceAction]);
    } else {
        sync = payload.sync;
        sync.actions = [fetchNonceAction];
    }

    if (sync) sync.id = `${sync.type}-${getId(payload)}-fetchNonce`;

    return { payload: { networkId, address, sync, fetchNonceAction } };
});
/** @internal */
export type GetNonceSyncedAction = ReturnType<typeof getNonceSynced>;
/** @internal */
export const isGetNonceSyncedAction = getNonceSynced.match;

export default getNonceSynced;

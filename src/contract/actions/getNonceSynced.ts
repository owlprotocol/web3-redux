import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { ContractId, getId } from '../model/interface';
import { getNonce } from './getNonce';
import { toChecksumAddress } from 'web3-utils';

/** @internal */
export const GET_NONCE_SYNCED = `${name}/GET_NONCE_SYNCED`;
/** @internal */
export interface GetNonceSyncedActionInput extends ContractId {
    sync: GenericSync;
}
/** @category Actions */
export const getNonceSynced = createAction(GET_NONCE_SYNCED, (payload: GetNonceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const fetchNonceAction = getNonce({ networkId, address });

    const sync = createSyncForActions(networkId, [fetchNonceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${getId(payload)}-fetchNonce`;

    return { payload: { networkId, address, sync, fetchNonceAction } };
});
/** @internal */
export type GetNonceSyncedAction = ReturnType<typeof getNonceSynced>;
/** @internal */
export const isGetNonceSyncedAction = getNonceSynced.match;

export default getNonceSynced;

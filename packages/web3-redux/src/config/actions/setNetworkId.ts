import { SET, set } from './set.js';

/** @internal */
export const SET_NETWORK_ID = SET('networkId');
/** @category Actions */
export const setNetworkId = (networkId: string | null) => set({ id: '0', key: 'networkId', value: networkId });
/** @internal */
export type SetNetworkIdAction = ReturnType<typeof setNetworkId>;

export default setNetworkId;

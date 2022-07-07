import { set } from './set.js';

/** @category Actions */
export const setNetworkId = (networkId: string | null) => set({ id: '0', key: 'networkId', value: networkId });
/** @internal */
export type SetNetworkIdAction = ReturnType<typeof setNetworkId>;

export default setNetworkId;

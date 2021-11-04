import { SET, set } from './set';

//Alias for SET/NETWORK_ID
export const SET_NETWORK_ID = SET('networkId');
export const setNetworkId = (networkId: string | undefined) => set({ id: '0', key: 'networkId', value: networkId });
export type SetNetworkIdAction = ReturnType<typeof setNetworkId>;

export default setNetworkId;

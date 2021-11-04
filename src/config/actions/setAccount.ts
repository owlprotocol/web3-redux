import { SET, set } from './set';

//Alias for SET/ACCOUNT
export const SET_ACCOUNT = SET('account');
export const setAccount = (account: string | undefined) => set({ id: '0', key: 'account', value: account });
export type SetAccountAction = ReturnType<typeof setAccount>;

export default setAccount;

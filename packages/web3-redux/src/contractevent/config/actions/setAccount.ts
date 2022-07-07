import { set } from './set.js';

/** @category Actions */
export const setAccount = (account: string | null) => set({ id: '0', key: 'account', value: account });
/** @internal */
export type SetAccountAction = ReturnType<typeof setAccount>;

export default setAccount;

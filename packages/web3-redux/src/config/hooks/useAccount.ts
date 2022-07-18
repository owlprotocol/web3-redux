import useConfig from './useConfig.js';

/**
 * @category Hooks
 * Returns the currently globally configured account and a setAccount
 * callback that will automatically dispatch an action.
 */
export function useAccount() {
    const [config, { setAccount }] = useConfig();
    const account = config?.account;
    return [account, setAccount] as [typeof account, typeof setAccount];
}

export default useAccount;

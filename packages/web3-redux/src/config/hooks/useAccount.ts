import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ConfigCRUD from '../crud.js';
import { setAccount } from '../actions/index.js';

/**
 * @category Hooks
 * Returns the currently globally configured account and a setAccount
 * callback that will automatically dispatch an action.
 */
export function useAccount() {
    const dispatch = useDispatch();
    const configResponse = ConfigCRUD.hooks.useGet({ id: '0' });
    const config = configResponse === 'loading' ? undefined : configResponse;
    const { account: value } = config ?? {};
    const setAccountCallback = useCallback(
        (account: string) => {
            dispatch(setAccount(account));
        },
        [dispatch],
    );

    return [value, setAccountCallback] as [typeof value, typeof setAccountCallback];
}

export default useAccount;

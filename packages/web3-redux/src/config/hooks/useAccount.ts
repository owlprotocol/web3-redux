import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '../actions/index.js';
import { selectAccount } from '../selectors/index.js';

/**
 * @category Hooks
 * Returns the currently globally configured account and a setAccount
 * callback that will automatically dispatch an action.
 */
export function useAccount() {
    const dispatch = useDispatch();
    const value = useSelector(selectAccount);
    const setAccountCallback = useCallback(
        (account: string) => {
            dispatch(setAccount(account));
        },
        [dispatch],
    );

    return [value, setAccountCallback] as [typeof value, typeof setAccountCallback];
}

export default useAccount;

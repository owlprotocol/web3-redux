import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '../actions';
import { selectAccount } from '../selectors';

/**
 * @category Hooks
 * Returns the currently globally configured account and a setAccount
 * callback that will automatically dispatch an action.
 */
export function useAccount() {
    const dispatch = useDispatch();
    const value = useSelector(selectAccount);
    const setAccountCallback = useCallback(
        (networkId: string) => {
            dispatch(setAccount(networkId));
        },
        [dispatch],
    );

    return [value, setAccountCallback] as [typeof value, typeof setAccountCallback];
}

export default useAccount;

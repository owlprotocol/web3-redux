import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkId } from '../actions';
import { selectNetworkId } from '../selectors';

/**
 * @category Hooks
 * Returns the currently globally configured networkId and a setNetworkId
 * callback that will automatically dispatch an action.
 */
export function useNetworkId() {
    const dispatch = useDispatch();
    const value = useSelector(selectNetworkId);
    const setNetworkIdCallback = useCallback(
        (networkId: string) => {
            dispatch(setNetworkId(networkId));
        },
        [dispatch],
    );

    return [value, setNetworkIdCallback];
}

export default useNetworkId;

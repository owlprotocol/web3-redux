import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNetworkId } from '../actions/index.js';
import ConfigCRUD from '../crud.js';

/**
 * @category Hooks
 * Returns the currently globally configured networkId and a setNetworkId
 * callback that will automatically dispatch an action.
 */
export function useNetworkId() {
    const dispatch = useDispatch();
    const config = ConfigCRUD.hooks.useGet({ id: '0' });
    const { networkId: value } = config ?? {};
    const setNetworkIdCallback = useCallback(
        (networkId: string) => {
            dispatch(setNetworkId(networkId));
        },
        [dispatch],
    );

    return [value, setNetworkIdCallback] as [typeof value, typeof setNetworkIdCallback];
}

export default useNetworkId;

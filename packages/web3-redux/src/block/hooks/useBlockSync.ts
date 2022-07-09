import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import * as BlockActions from '../actions/index.js';
import BlockCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';

/**
 * Reads blocks for network and syncs data with a block subscription.
 * @category Hooks
 * */
export const useBlockSync = (networkId: string | undefined, returnTransactionObjects = false) => {
    const dispatch = useDispatch();

    const network = NetworkCRUD.hooks.useGet({ networkId });
    const blocks = BlockCRUD.hooks.useWhere({ networkId });
    const networkExists = !!network;

    //Recompute subscribe function if network is created, otherwise function is void
    const subscribe = useCallback(() => {
        if (networkId && networkExists) {
            dispatch(BlockActions.subscribe({ networkId, returnTransactionObjects }));
        }
    }, [networkId, returnTransactionObjects, dispatch, networkExists]);

    const unsubscribe = useCallback(() => {
        if (networkId && networkExists) {
            dispatch(BlockActions.unsubscribe(networkId));
        }
    }, [networkId, dispatch, networkExists]);

    useEffect(() => {
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [subscribe, unsubscribe]);

    //Return subscribe/unsubscribe functions if use wants to manually control flow
    return [blocks, { subscribe, unsubscribe }];
};

export default useBlockSync;

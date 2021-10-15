import { useDispatch, useSelector } from 'react-redux';
import * as BlockActions from './actions';
import * as NetworkSelector from '../network/selector';
import { useEffect, useCallback } from 'react';

export const useBlockSync = (networkId: string | undefined, returnTransactionObjects = false) => {
    const dispatch = useDispatch();

    const network = useSelector((state) => NetworkSelector.selectByIdSingle(state, networkId));
    const blocks = useSelector((state) => NetworkSelector.selectSingleBlocks(state, networkId));

    //Recompute subscribe function if network is created, otherwise function is void
    const subscribe = useCallback(() => {
        if (networkId && network) {
            dispatch(BlockActions.subscribe({ networkId, returnTransactionObjects }));
        }
    }, [networkId, returnTransactionObjects, dispatch, network]);

    const unsubscribe = useCallback(() => {
        if (networkId && network) {
            dispatch(BlockActions.unsubscribe(networkId));
        }
    }, [networkId, dispatch, network]);

    useEffect(() => {
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [networkId, returnTransactionObjects, dispatch, subscribe, unsubscribe]);

    //Return subscribe/unsubscribe functions if use wants to manually control flow
    return [blocks, { subscribe, unsubscribe }];
};

export default useBlockSync;

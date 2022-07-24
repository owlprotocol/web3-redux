import { useCallback } from 'react';
import { Contract } from '@owlprotocol/web3-redux';
import { useDispatch } from 'react-redux';

export const useLabel = (networkId: string | undefined, address: string | undefined) => {
    const dispatch = useDispatch();

    const [contract] = Contract.hooks.useGet({ networkId, address });
    const label = contract?.label;

    const setLabel = useCallback(
        (v) => {
            if (networkId && address) {
                dispatch(Contract.actions.upsert({ networkId, address, label: v }));
            }
        },
        [dispatch, address, networkId],
    );

    const returnOptions = { setLabel };
    return [label, returnOptions] as [typeof label, typeof returnOptions];
};

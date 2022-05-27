import composeHooks from 'react-hooks-compose';
import { useSelector, useDispatch } from 'react-redux';
import { Contract } from '@owlprotocol/web3-redux';
import { useCallback, useMemo } from 'react';
import AddressDisplayPresenter from './AddressDisplayPresenter';

export interface HookProps {
    networkId: string;
    address: string;
}

const useAddressDisplay = ({ networkId, address }: HookProps) => {
    const dispatch = useDispatch();
    const contract = useSelector((state) => Contract.selectByIdSingle(state, { networkId, address }));
    const label = contract?.label;
    const indexIds: string[] = useMemo(() => contract?.indexIds ?? [], [contract]);
    const isFavorite = indexIds.find((v) => v === 'Favorites');

    const setFavorite = useCallback(
        (v) => {
            //Remove Favorites label
            const newIds = indexIds.filter((v) => v !== 'Favorites');
            //Add favorites
            if (v) newIds.push('Favorites');
            dispatch(Contract.set({ id: { networkId, address }, key: 'indexIds', value: newIds }));
        },
        [networkId, address, dispatch, indexIds],
    );

    const setLabel = useCallback(
        (v) => {
            dispatch(Contract.set({ id: { networkId, address }, key: 'label', value: v }));
        },
        [dispatch, address, networkId],
    );

    return { label, isFavorite, setFavorite, setLabel };
};

export interface Props {
    networkId: string;
    address: string;
    borderRadius?: number;
    bg?: string;
}
const AddressDisplay = composeHooks((props: HookProps) => ({
    useAddressDisplay: () => useAddressDisplay(props),
}))(AddressDisplayPresenter) as (props: Props) => JSX.Element;

//@ts-expect-error
AddressDisplay.displayName = 'AddressDisplay';

export { AddressDisplay };
export default AddressDisplay;

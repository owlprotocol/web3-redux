import composeHooks from 'react-hooks-compose';
import { useDispatch } from 'react-redux';
import { Contract } from '@owlprotocol/web3-redux';
import { useCallback, useMemo } from 'react';
import AddressDisplayPresenter from './AddressDisplayPresenter.js';

export interface HookProps {
    networkId: string;
    address: string;
}

const FAVORITES = 'Favorites';
const useAddressDisplay = ({ networkId, address }: HookProps) => {
    const dispatch = useDispatch();
    const contract = Contract.hooks.useSelectByIdSingle({ networkId, address });
    const label = contract?.label;
    const tags = useMemo(() => contract?.tags ?? [], [contract]);
    const isFavorite = tags.includes(FAVORITES);

    const setFavorite = useCallback(() => {
        //Add favorites
        if (isFavorite) dispatch(Contract.actions.update({ networkId, address, tags: [...tags, FAVORITES] }));
        else dispatch(Contract.actions.update({ networkId, address, tags: tags.filter((t) => t != FAVORITES) }));
    }, [networkId, address, dispatch, tags, isFavorite]);

    const setLabel = useCallback(
        (v) => {
            dispatch(Contract.actions.update({ networkId, address, label: v }));
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

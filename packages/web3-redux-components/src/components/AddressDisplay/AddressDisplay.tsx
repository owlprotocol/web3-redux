import composeHooks from 'react-hooks-compose';
import { useSelector, useDispatch } from 'react-redux';
import { Contract } from '@owlprotocol/web3-redux';
import { useCallback } from 'react';
import AddressDisplayPresenter from './AddressDisplayPresenter';

export interface HookProps {
    networkId: string;
    address: string;
}

const useAddressDisplay = ({ networkId, address }: HookProps) => {
    const dispatch = useDispatch();
    const contract = useSelector((state) => Contract.selectByIdSingle(state, { networkId, address }));
    const label = contract?.label;
    //const favoirte =
    const setFavorite = useCallback((v) => {
        console.log(v);
    }, []);

    const setLabel = useCallback(
        (v) => {
            dispatch(Contract.set({ id: { networkId, address }, key: 'label', value: v }));
        },
        [dispatch, address, networkId],
    );

    return { label, setFavorite, setLabel };
};

export interface Props {
    networkId: string;
    address: string;
    borderRadius?: number;
    bg?: string;
}
const AddressDisplay = composeHooks((props: HookProps) => ({
    useAddressDisplay: () => useAddressDisplay(props),
}))(AddressDisplayPresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
AddressDisplay.displayName = 'AddressDisplay';

export { AddressDisplay };
export default AddressDisplay;

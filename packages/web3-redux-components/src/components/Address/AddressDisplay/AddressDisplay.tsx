import composeHooks from 'react-hooks-compose';
import { StyleProps } from '@chakra-ui/react';
import AddressDisplayPresenter, { Control } from './AddressDisplayPresenter.js';
import { useFavorite } from '../AddressFavoriteButton/useFavorite.js';
import { Address } from '../../../interfaces/Address.js';
import { useLabel } from '../AddressLabel/useLabel.js';

export type useAddressDisplayProps = Partial<Address>;
const useAddressDisplay = ({ networkId, address }: useAddressDisplayProps) => {
    const [isFavorite, { toggleFavorite }] = useFavorite(networkId, address);
    const [label, { setLabel }] = useLabel(networkId, address);

    return { label, isFavorite, toggleFavorite, setLabel };
};

export interface AddressDisplayProps extends Partial<Address> {
    borderRadius?: number;
    bg?: string;
    controls?: Control[];
    containerStyles?: StyleProps;
}
const AddressDisplay = composeHooks(({ networkId, address }: AddressDisplayProps) => ({
    useAddressDisplay: () => useAddressDisplay({ networkId, address }),
}))(AddressDisplayPresenter) as (props: AddressDisplayProps) => JSX.Element;

//@ts-expect-error
AddressDisplay.displayName = 'AddressDisplay';

export { AddressDisplay };

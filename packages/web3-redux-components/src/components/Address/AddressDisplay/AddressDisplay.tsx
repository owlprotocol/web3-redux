import composeHooks from 'react-hooks-compose';
import AddressDisplayPresenter from './AddressDisplayPresenter.js';
import { useFavorite } from '../AddressFavoriteButton/useFavorite.js';
import { Address } from '../../../interfaces/Address.js';
import { useLabel } from '../AddressLabel/useLabel.js';

const useAddressDisplay = ({ networkId, address }: Partial<Address>) => {
    const [isFavorite, { toggleFavorite }] = useFavorite(networkId, address);
    const [label, { setLabel }] = useLabel(networkId, address);

    return { label, isFavorite, toggleFavorite, setLabel };
};

export interface AddressDisplayProps extends Partial<Address> {
    borderRadius?: number;
    bg?: string;
}
const AddressDisplay = composeHooks((props: Address) => ({
    useAddressDisplay: () => useAddressDisplay(props),
}))(AddressDisplayPresenter) as (props: AddressDisplayProps) => JSX.Element;

//@ts-expect-error
AddressDisplay.displayName = 'AddressDisplay';

export { AddressDisplay };

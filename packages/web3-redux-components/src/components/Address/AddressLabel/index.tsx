import { useLabel } from './useLabel.js';
import { Address } from '../../../interfaces/Address.js';

export type AddressLabelProps = Address;

export const AddressLabel = ({ networkId, address }: AddressLabelProps) => {
    const [label] = useLabel(networkId, address);
    return <>{label}</>;
};

export { useLabel };

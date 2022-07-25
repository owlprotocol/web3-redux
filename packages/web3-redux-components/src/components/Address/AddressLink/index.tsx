import { Link } from 'react-router-dom';

export interface AddressLinkProps {
    address: string | undefined;
}

//TODO: Add UX improvements such as ENS / Labelling
export const AddressLink = ({ address }: AddressLinkProps) => {
    if (!address) return <></>;

    const addressLower = address.toLowerCase();
    const addressDisplay = addressLower.substring(2, 6);
    const to = `/address/${addressLower}`;
    return <Link to={to}> {addressDisplay} </Link>;
};

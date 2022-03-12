import { Contract } from '@owlprotocol/web3-redux';
/**
 * A component to display an ERC20 Token.
 *
 */
export interface Props {
    networkId: string;
    address: string;
}
export const ERC20Display = ({ networkId, address }: Props) => {
    return (
        <>
            Display an ERC20 Token at {address} on network {networkId}.
            {Contract.CALL} a
        </>
    );
};

export default ERC20Display;

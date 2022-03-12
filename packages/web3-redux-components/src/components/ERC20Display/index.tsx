import { Contract, Environment } from '@owlprotocol/web3-redux';
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
            Display an ERC20 Token at {address} on network {networkId}
            <br />
            meta: {import.meta.env.VITE_INFURA_API_KEY}
            <br />
            process.env: {process.env.VITE_INFURA_API_KEY}
            <br />
            Environment.INFURA_API_KEY:{Environment.INFURA_API_KEY}
            <br />
            getEnvVar{Environment.getEnvVar('INFURA_API_KEY')}
        </>
    );
};

export default ERC20Display;

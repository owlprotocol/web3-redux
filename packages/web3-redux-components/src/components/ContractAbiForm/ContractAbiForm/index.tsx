import type { AbiType, StateMutabilityType } from 'web3-utils';
import AbiItemForm from '../AbiItemForm';
interface AbiFormProps {
    name: string | undefined;
    inputs: {
        name: string | undefined;
        type: string;
    }[];
    type: AbiType;
    stateMutability: StateMutabilityType;
}
export interface Props {
    networkId: string;
    address: string;
    abi: AbiFormProps[];
}

export const ContractAbiForm = ({ networkId, address, abi }: Props) => {
    const abiFunctions = abi.filter((a) => a.type === 'function');

    return (
        <div>
            {abiFunctions.map((fnAbi, key: number) => (
                <div key={key}>
                    <AbiItemForm networkId={networkId} address={address} namePrefix={`${key + 1}. `} {...fnAbi} />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default ContractAbiForm;

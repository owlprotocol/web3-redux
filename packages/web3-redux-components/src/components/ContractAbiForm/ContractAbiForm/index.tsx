import { AbiType, StateMutabilityType } from 'web3-utils';
import AbiItemForm from '../AbiItemForm2';
interface AbiFormProps {
    name: string | undefined;
    inputs: {
        name: string | undefined;
        type: string;
    }[];
    type: AbiType;
    stateMutability: StateMutabilityType;
}
interface Props {
    networkId: string;
    address: string;
    abi: AbiFormProps[];
}

const ContractAbiForm = ({ networkId, address, abi }: Props) => {
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

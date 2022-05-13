import { useTheme } from '@chakra-ui/react';
import { AbiType, StateMutabilityType } from 'web3-utils';
import AbiForm from './AbiForm';
interface AbiFormProps {
    name: string,
    inputs: {
        name: string;
        type: string;
    }[],
    type: AbiType,
    stateMutability: StateMutabilityType,
}
interface Props {
    networkId: string;
    address: string;
    abi: AbiFormProps[];
}

const ContractAbiForm = ({
    networkId,
    address,
    abi
}: Props) => {
    return (
        <div>
            <form>
                {abi.map((fnAbi, key: number) => (
                    <div key={key}>
                        <AbiForm networkId={networkId} address={address} namePrefix={`${key + 1}. `} {...fnAbi} />
                        <br />
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ContractAbiForm;

import { AbiType, StateMutabilityType } from 'web3-utils';
import AbiForm from './AbiForm';
interface AbiFormProps {
    name: string | undefined,
    inputs: {
        name: string | undefined;
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

    const abiRead = abi.filter((a) => a.stateMutability === 'pure' || a.stateMutability === 'view')

    return (
        <div>
            <form>
                {abiRead.map((fnAbi, key: number) => (
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

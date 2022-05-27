import { Contract } from '@owlprotocol/web3-redux';
import { useCallback, useState } from 'react';
import Web3 from 'web3';
import AbiItemForm from '../../ContractAbiForm/AbiItemForm2';
import SelectAddress from '../../ContractAbiForm/SelectAddress';

export interface Props {
    networkId: string;
    factoryAddress: string;
    implementationInitializer?: string;
}

const web3 = new Web3();
const coder = web3.eth.abi;

//TODO: Error thrown if implementation not-exist
//Tags for implementation contracts
const ImplementationIndexes = ['ERC20Implementation']; //['ERC20Implementation', 'ERC721Implementation'];

/**
 * Deploy an arbitrary contract using an ERC1167 Minimal Proxy
 * @param props
 * @returns Form component
 */
export const ERC1167FactoryForm = ({ networkId, factoryAddress, implementationInitializer = 'initialize' }: Props) => {
    //User selects implementation, we use this for the factory and to generate the initializer form
    const [implementationAddress, setImplementationAddress] = useState<string | undefined>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const factoryContract = Contract.useContract(networkId, factoryAddress);

    //Get Implementation Contract
    const implementationContract = Contract.useContract(networkId, implementationAddress);
    const abi = implementationContract?.abi ?? [];
    const abiItem = abi.find((f) => {
        return f.name === implementationInitializer;
    });
    const inputs = abiItem?.inputs ?? [];

    const [data, setData] = useState<string | undefined>();
    const onChange = useCallback(
        (args, error, valid) => {
            if (valid && abiItem && abiItem.inputs?.length === args.length) {
                const d = coder.encodeFunctionCall(abiItem, args);
                setData(d);
            } else {
                setData(undefined);
            }
        },
        [abiItem],
    );

    console.debug({ data });

    return (
        <>
            <SelectAddress
                networkId={networkId}
                indexFilter={ImplementationIndexes}
                onChangeHandler={setImplementationAddress}
            />
            <AbiItemForm inputs={inputs ?? []} onChange={onChange} />
        </>
    );
};

export default ERC1167FactoryForm;

import { Box, Button, FormControl, FormErrorMessage, useTheme } from '@chakra-ui/react';
import { Contract, Config, ContractSendStatus } from '@owlprotocol/web3-redux';
import { useCallback, useState } from 'react';
import Web3 from 'web3';
import AbiItemForm from '../../ContractAbiForm/AbiItemForm2/index.js';
import SelectAddress from '../../ContractAbiForm/SelectAddress/index.js';

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
    const { themes } = useTheme();
    const [account] = Config.hooks.useAccount();

    //User selects implementation, we use this for the factory and to generate the initializer form
    const [implementationAddress, setImplementationAddress] = useState<string | undefined>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const factoryContract = Contract.hooks.useContract(networkId, factoryAddress);

    //Get Implementation Contract
    const [implementationContract] = Contract.hooks.useContract(networkId, implementationAddress);
    const abi = implementationContract?.abi ?? [];
    const abiItem = abi.find((f) => {
        return f.name === implementationInitializer;
    });
    const inputs = abiItem?.inputs ?? [];

    const [valid, setValid] = useState(false);
    const [data, setData] = useState<string | undefined>();
    const onChange = useCallback(
        (args, error, valid) => {
            setValid(valid);
            if (valid && abiItem && abiItem.inputs?.length === args.length) {
                const d = coder.encodeFunctionCall(abiItem, args);
                setData(d);
            } else {
                setData(undefined);
            }
        },
        [abiItem],
    );

    const [sendTx, { error, contractSend }] = Contract.hooks.useContractSend(
        networkId,
        factoryAddress,
        'cloneDetermistic',
        [implementationAddress, data],
        {
            from: account,
        },
    );
    const { status, transactionHash, receipt, confirmations } = contractSend ?? {};

    console.debug({ data });

    const isPendingSig = status == ContractSendStatus.PENDING_SIGNATURE;
    const isPendingConf = status == ContractSendStatus.PENDING_CONFIRMATION;
    const isPending = isPendingSig || isPendingConf;

    let isPendingText: string | undefined;
    if (isPendingSig) isPendingText = 'Waiting for signature...';
    else if (isPendingConf) isPendingText = 'Waiting for confirmation...';

    let resultText: string | undefined;
    if (transactionHash && !confirmations) resultText = `Transaction hash: ${transactionHash}`;
    else if (transactionHash && confirmations && receipt.blockNumber)
        resultText = `Transaction hash: ${transactionHash} Confirmed at block:${receipt.blockNumber}`;

    const isError = !!error;

    return (
        <>
            <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
                <FormControl isInvalid={isError}>
                    <SelectAddress
                        networkId={networkId}
                        indexFilter={ImplementationIndexes}
                        onChangeHandler={setImplementationAddress}
                    />
                    <AbiItemForm inputs={inputs ?? []} onChange={onChange} />
                    <Button
                        isDisabled={!valid && !!implementationAddress}
                        isLoading={isPending}
                        loadingText={isPendingText}
                        onClick={sendTx}
                        bg={themes.color1}
                        mb={3}
                    >
                        Deploy
                    </Button>
                    {resultText}
                    {isError && <FormErrorMessage>Error: {error?.message}</FormErrorMessage>}
                </FormControl>
            </Box>
        </>
    );
};

export default ERC1167FactoryForm;

import { useCallback, useEffect, useState } from 'react';
import { Box, useTheme, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import type { AbiType, StateMutabilityType } from 'web3-utils';
import { Config, Contract, ContractSendStatus } from '@owlprotocol/web3-redux';
import AbiItemInput from '../AbiItemInput/index.js';

//TODO
//Formik integration
//https://chakra-ui.com/docs/components/form/form-control#usage-with-form-libraries
//Better error handling for reverts

//Similar to AbiItem interface
export interface Props {
    networkId: string;
    address: string | undefined;
    account?: string;
    namePrefix?: string;
    name: string | undefined;
    inputs: {
        name: string | undefined;
        type: string;
    }[];
    type: AbiType;
    stateMutability: StateMutabilityType;
}

export const AbiItemForm = ({
    networkId,
    address,
    account,
    namePrefix = '',
    name,
    inputs = [],
    type = 'function',
    stateMutability = 'view',
}: Props) => {
    const { themes } = useTheme();
    //const dispatch = useDispatch();

    const [configAccount] = Config.hooks.useAccount();
    const [configNetworkId] = Config.hooks.useNetworkId();
    account = account ?? configAccount;
    networkId = networkId ?? configNetworkId;

    //Errors caused by user input
    const [inputErrors, setInputErrors] = useState(new Array(inputs.length));
    const [args, setArgs] = useState(new Array(inputs.length));

    const setErrorAtIdx = useCallback(
        (err: any, idx: number) => {
            const errCopy = [...inputErrors];
            errCopy[idx] = err;
            setInputErrors(errCopy);
        },
        [inputErrors],
    );

    const setArgAtIdx = useCallback(
        (arg: any, idx: number) => {
            const argsCopy = [...args];
            argsCopy[idx] = arg;
            setArgs(argsCopy);
        },
        [args],
    );

    useEffect(() => {
        //Reset state
        setInputErrors(Array(inputs.length));
        setArgs(Array(inputs.length));
    }, [inputs.length]);

    const write = !(stateMutability === 'pure' || stateMutability == 'view');

    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noInputErrors =
        inputErrors.length > 0 ? inputErrors.reduce((acc, curr) => acc && !curr, !inputErrors[0]) : true;
    const validArgs = argsDefined && noInputErrors;

    const [returnValue, { error: callError }] = Contract.hooks.useContractCall(networkId, address, name, args, {
        sync: !write && validArgs ? 'once' : false,
    });

    console.debug({ returnValue, callError, inputErrors, validArgs, write, account });

    const onChange = useCallback(
        (value: string | boolean | undefined, error: Error | undefined, idx: number) => {
            setErrorAtIdx(error, idx);
            setArgAtIdx(value, idx);
        },
        [setErrorAtIdx, setArgAtIdx],
    );

    const [sendTx, { error: sendError, contractSend }] = Contract.hooks.useContractSend(
        networkId,
        address,
        name,
        args,
        {
            from: account,
        },
    );
    const { status, transactionHash, receipt, confirmations } = contractSend ?? {};

    // EVM error
    const error = callError ?? sendError;
    const isError = !!error;

    const isPendingSig = status == ContractSendStatus.PENDING_SIGNATURE;
    const isPendingConf = status == ContractSendStatus.PENDING_CONFIRMATION;
    const isPending = isPendingSig || isPendingConf;

    let isPendingText: string | undefined;
    if (isPendingSig) isPendingText = 'Waiting for signature...';
    else if (isPendingConf) isPendingText = 'Waiting for confirmation...';

    const isDisabled = !validArgs || isPending;

    let resultText: string | undefined;
    if (!write && returnValue) resultText = `Return value: ${returnValue}`;
    else if (write && transactionHash && !confirmations) resultText = `Transaction hash: ${transactionHash}`;
    else if (write && transactionHash && confirmations && receipt.blockNumber)
        resultText = `Transaction hash: ${transactionHash} Confirmed at block:${receipt.blockNumber}`;

    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <Box mb={6}>
                <span>{namePrefix}</span>
                <b>{name}</b>&nbsp;
                <i>{type}</i>
            </Box>
            <FormControl isInvalid={isError}>
                {inputs.map(({ name, type }: any, key: number) => {
                    return (
                        <Box mb={3} key={key}>
                            <AbiItemInput
                                type={type}
                                name={name}
                                onChange={(value, error) => {
                                    onChange(value, error, key);
                                }}
                            />
                        </Box>
                    );
                })}
                {write && (
                    <>
                        <Button
                            isDisabled={isDisabled}
                            isLoading={isPending}
                            loadingText={isPendingText}
                            onClick={sendTx}
                            bg={themes.color1}
                            mb={3}
                        >
                            Send
                        </Button>
                    </>
                )}
                {resultText}
                {isError && <FormErrorMessage>Error: {error?.message}</FormErrorMessage>}
            </FormControl>
        </Box>
    );
};

export default AbiItemForm;

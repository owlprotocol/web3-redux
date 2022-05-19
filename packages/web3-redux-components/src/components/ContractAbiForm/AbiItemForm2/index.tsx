import { useCallback, useEffect, useState } from 'react';
import { Box, useTheme, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
import { AbiType, StateMutabilityType } from 'web3-utils';
import { Config, Contract } from '@owlprotocol/web3-redux';
import AbiItemInput from '../AbiItemInput2';

//TODO
//Formik integration
//https://chakra-ui.com/docs/components/form/form-control#usage-with-form-libraries
//Better error handling for reverts

//Similar to AbiItem interface
interface Props {
    networkId: string;
    address: string;
    account?: string;
    namePrefix: string;
    name: string | undefined;
    inputs: {
        name: string | undefined;
        type: string;
    }[];
    type: AbiType;
    stateMutability: StateMutabilityType;
}

const AbiItemForm = ({
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

    const [configAccount] = Config.useAccount();
    const [configNetworkId] = Config.useNetworkId();
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

    const [returnValue, { error: callError }] = Contract.useContractCall(networkId, address, name, args, {
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

    const [sendTx, { error: sendError }] = Contract.useContractSend(networkId, address, name, args, { from: account });
    /*
    const sendTx = useCallback(() => {
        if (validArgs && write && !!account) {
            dispatch(Contract.send({
                networkId,
                address,
                method: name,
                args,
                from: account
            }))
        }
    }, [networkId, address, name, validArgs, account, write])
    */

    // EVM error
    const error = callError ?? sendError;
    const isError = !!error;
    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <span>{namePrefix}</span>
            <b>{name}</b>&nbsp;
            <i>{type}</i>
            <br />
            <br />
            <div>
                <FormControl isInvalid={isError}>
                    {inputs.map(({ name, type }: any, key: number) => {
                        return (
                            <AbiItemInput
                                key={key}
                                type={type}
                                name={name}
                                onChange={(value, error) => {
                                    onChange(value, error, key);
                                }}
                            />
                        );
                    })}
                    {write && (
                        <Button isDisabled={!validArgs} onClick={sendTx} bg={themes.color1}>
                            Send
                        </Button>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {returnValue}
                    {isError && <FormErrorMessage>Error: {error?.message}</FormErrorMessage>}
                </FormControl>
            </div>
        </Box>
    );
};

export default AbiItemForm;

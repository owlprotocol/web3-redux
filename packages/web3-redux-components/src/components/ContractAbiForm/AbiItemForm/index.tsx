import { useCallback, useEffect, useState } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AbiType, StateMutabilityType } from 'web3-utils';
import { Contract } from '@owlprotocol/web3-redux';
import AbiItemInput from '../AbiItemInput';
import Button from '../../Button';

//TODO
//Formik integration
//https://chakra-ui.com/docs/components/form/form-control#usage-with-form-libraries
//Better error handling for reverts

//Similar to AbiItem interface
interface Props {
    networkId: string;
    address: string;
    account: string | undefined;
    namePrefix: string,
    name: string | undefined,
    inputs: {
        name: string | undefined;
        type: string;
    }[],
    type: AbiType,
    stateMutability: StateMutabilityType,
}

const AbiItemForm = ({
    networkId,
    address,
    account,
    namePrefix = '',
    name,
    inputs = [],
    type = 'function',
    stateMutability = 'view' }: Props) => {
    const { themes } = useTheme();
    const dispatch = useDispatch()

    const [errors, setErrors] = useState(new Array(inputs.length));
    const [args, setArgs] = useState(new Array(inputs.length));

    const setErrorAtIdx = useCallback((err: any, idx: number) => {
        const errCopy = [...errors];
        errCopy[idx] = err;
        setErrors(errCopy)
    }, [errors])

    const setArgAtIdx = useCallback((arg: any, idx: number) => {
        const argsCopy = [...args]
        argsCopy[idx] = arg;
        setArgs(argsCopy);
    }, [args])

    useEffect(() => {
        //Reset state
        setErrors(Array(inputs.length));
        setArgs(Array(inputs.length));
    }, [inputs.length])

    const write = !(stateMutability === 'pure' || stateMutability == 'view');

    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noErrors = errors.length > 0 ? errors.reduce((acc, curr) => acc && !curr, !errors[0]) : true;

    const validCallArgs = argsDefined && noErrors;
    const [contractCall] = Contract.useContractCall(!write && validCallArgs ? networkId : undefined, address, name, args, { sync: 'once' })

    const onChange = useCallback((value: string | undefined, error: Error | undefined, idx: number) => {
        setErrorAtIdx(error, idx)
        setArgAtIdx(value, idx);
    }, [setErrorAtIdx, setArgAtIdx]);

    const sendTx = useCallback(() => {
        if (validCallArgs && !!account) {
            dispatch(Contract.send({
                networkId,
                address,
                method: name!,
                args,
                from: account
            }))
        }
    }, [networkId, address, validCallArgs, account])


    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <span>{namePrefix}</span>
            <b>{name}</b>&nbsp;
            <i>{type}</i>
            <br />
            <br />
            <div>
                {inputs.map(({ name, type }: any, key: number) => {
                    return (
                        <AbiItemInput
                            key={key}
                            type={type}
                            name={name}
                            onChange={(value, error) => { onChange(value, error, key) }}
                        />
                    );
                })}
                {
                    write && <Button text='Send' onClick={sendTx} bg={themes.color1} />
                }
                &nbsp;&nbsp;&nbsp;&nbsp;
                {write &&
                    <Button text="Show Transaction" onClick={() => null} bg={themes.color2} />
                }
                {
                    contractCall
                }
            </div>
        </Box>
    );
};

export default AbiItemForm;

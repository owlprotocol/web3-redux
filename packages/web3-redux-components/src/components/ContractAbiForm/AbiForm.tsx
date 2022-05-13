import { useCallback, useEffect, useState } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import Web3 from 'web3';
import { AbiType, StateMutabilityType } from 'web3-utils';
import { Contract } from '@owlprotocol/web3-redux';
import AbiEntityInput from './AbiEntityInput';
import Button from '../Button';

//TODO
//Formik integration
//https://chakra-ui.com/docs/components/form/form-control#usage-with-form-libraries

//Similar to AbiItem interface
interface Props {
    networkId: string;
    address: string;
    namePrefix: string,
    name: string,
    inputs: {
        name: string | undefined;
        type: string;
    }[],
    type: AbiType,
    stateMutability: StateMutabilityType,
}

const AbiForm = ({
    networkId,
    address,
    namePrefix = '',
    name,
    inputs = [],
    type = 'function',
    stateMutability = 'view' }: Props) => {
    const { themes } = useTheme();
    const [errors, setErrors] = useState(new Array(inputs.length));
    const [args, setArgs] = useState(new Array(inputs.length));

    const setErrorAtIdx = useCallback((err: any, idx: number) => {
        const errCopy = [...errors];
        errCopy[idx] = err;
        setErrors(errCopy)
    }, [])

    const setArgAtIdx = useCallback((arg: any, idx: number) => {
        const argsCopy = [...args]
        argsCopy[idx] = arg;
        setArgs(argsCopy);
    }, [])

    useEffect(() => {
        //Reset state
        setErrors(Array(inputs.length));
        setArgs(Array(inputs.length));
    }, [inputs.length])

    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noErrors = errors.length > 0 ? errors.reduce((acc, curr) => acc && !curr, !errors[0]) : true;
    const validArgs = argsDefined && noErrors;

    let contractCall;
    [contractCall] = Contract.useContractCall(validArgs ? networkId : undefined, address, name, args, { sync: 'once' })

    const write = !(stateMutability === 'pure' || stateMutability == 'view');

    const handleEntityChange = (value: string, idx: number) => {
        const { type, name } = inputs[idx];
        //TODO: Move abi item validation outside component
        //TODO: boolean, number parsing
        if (value.length == 0) {
            setErrorAtIdx(undefined, idx)
            setArgAtIdx(undefined, idx);
        } else if (type === 'address') {
            try {
                const _value = Web3.utils.toChecksumAddress(value);
                setErrorAtIdx(undefined, idx)
                setArgAtIdx(_value, idx);
            } catch (err) {
                setErrorAtIdx('Not a valid Address', idx)
                setArgAtIdx(value, idx);
            }
        } else {
            setErrorAtIdx(undefined, idx)
            setArgAtIdx(value, idx);
        }
    };


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
                        <AbiEntityInput
                            key={key}
                            type={type}
                            name={inputs[key].name}
                            errMsg={errors[key]}
                            onChange={(val: string) => { handleEntityChange(val, key) }}
                        />
                    );
                })}
                {
                    write && <Button text='Write' onClick={() => null} bg={themes.color1} />
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

export default AbiForm;

import { useCallback, useState } from 'react';
import Web3 from 'web3';
import { Input, NumberInput, Checkbox, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/react'

const web3 = new Web3()
const coder = web3.eth.abi;

type AbiItemInputType = 'string' | 'address' | 'boolean' | 'bytes' |
    'bytes32' | 'byte16' | 'bytes8' | 'bytes4' |
    'uint256' | 'uint128' | 'uint64' | 'uint32' | 'uint16' | 'uint8' | 'uint4' |
    'int256' | 'int128' | 'int64' | 'int32' | 'int16' | 'int8' | 'int4'


export interface Props {
    type: AbiItemInputType;
    name?: string | undefined;
    onChange?: (value: string | boolean | undefined, error: Error | undefined) => void;
}

const AbiItemInput = ({ type, name, onChange = () => { } }: Props) => {
    const [error, setError] = useState<Error | undefined>();
    const [value, setValue] = useState<string | boolean | undefined>();

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    let inputType: 'string' | 'number' | 'boolean' = 'string';
    if (type.startsWith('uint') || type.startsWith('int')) inputType = 'number';
    else if (type === 'boolean') inputType = 'boolean';

    const onChangeValidate = useCallback((_value: string | boolean) => {
        console.debug({ _value })
        if (typeof _value == 'boolean') {
            setError(undefined); setValue(_value);
            onChange(value, error);
            return;
        }

        //Empty
        if (_value.length == 0) {
            setError(undefined); setValue(undefined);
            onChange(value, error);
            return;
        }

        //Address
        //TODO: Update input field value
        if (type === 'address' && Web3.utils.isAddress(_value.toLowerCase())) {
            _value = Web3.utils.toChecksumAddress(_value);
        }

        //Validate
        try {
            coder.encodeParameter(type, _value);
        } catch (_error: any) {
            setError(_error); setValue(_value)
            onChange(_value, _error)
            return;
        }

        //Format address if valid
        setError(undefined); setValue(_value)
        onChange(value, error);
    }, [onChange]);

    //Custom NumberInput Add-on to add unit selector
    return (
        <>
            <FormControl isInvalid={!!error}>
                {
                    {
                        'string': <Input placeholder={placeholder}
                            value={value as string | undefined}
                            onChange={({ target }) => onChangeValidate(target.value)}
                        />,
                        'boolean': <>
                            <FormLabel>{placeholder}</FormLabel>
                            <Checkbox
                                onChange={({ target }) => onChangeValidate(target.checked)} />
                        </>,
                        'number': <NumberInput
                            onChange={onChangeValidate}>
                            <NumberInputField placeholder={placeholder} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    }[inputType]
                }
                {
                    error && <FormErrorMessage>{error.message}</FormErrorMessage>
                }
            </FormControl>
        </>
    );
};

export default AbiItemInput;

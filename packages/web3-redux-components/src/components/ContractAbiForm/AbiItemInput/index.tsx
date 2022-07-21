import { useCallback, useState } from 'react';
import Web3 from 'web3';
import {
    useTheme,
    HStack,
    Input,
    NumberInput,
    Checkbox,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    FormErrorMessage,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

const web3 = new Web3();
const coder = web3.eth.abi;

type AbiItemInputType =
    | 'string'
    | 'address'
    | 'boolean'
    | 'bytes'
    | 'bytes32'
    | 'byte16'
    | 'bytes8'
    | 'bytes4'
    | 'uint256'
    | 'uint128'
    | 'uint64'
    | 'uint32'
    | 'uint16'
    | 'uint8'
    | 'uint4'
    | 'int256'
    | 'int128'
    | 'int64'
    | 'int32'
    | 'int16'
    | 'int8'
    | 'int4';

export interface Props {
    type: AbiItemInputType;
    name?: string | undefined;
    onChange?: (value: string | boolean | undefined, error: Error | undefined) => void;
}

//eslint-disable-next-line @typescript-eslint/no-empty-function
export const AbiItemInput = ({ type, name, onChange = (value, error) => console.log({ value, error }) }: Props) => {
    const { themes } = useTheme();

    const [error, setError] = useState<Error | undefined>();
    const [value, setValue] = useState<string | boolean | undefined>();

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    let inputType: 'string' | 'number' | 'boolean' = 'string';
    if (type.startsWith('uint') || type.startsWith('int')) inputType = 'number';
    else if (type === 'boolean') inputType = 'boolean';

    const onChangeValidate = useCallback(
        (_value: string | boolean) => {
            if (typeof _value == 'boolean') {
                setError(undefined);
                setValue(_value);
                onChange(_value, undefined);
                return;
            }

            //Empty
            if (_value.length == 0) {
                setError(undefined);
                setValue(undefined);
                onChange(undefined, undefined);
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
                //Format is valid
                setError(undefined);
                setValue(_value);
                onChange(_value, undefined);
            } catch (_error: any) {
                setError(_error);
                setValue(_value);
                onChange(_value, _error);
                return;
            }
        },
        [onChange, type],
    );

    //Custom NumberInput Add-on to add unit selector
    return (
        <>
            <FormControl isInvalid={!!error}>
                {
                    {
                        string: (
                            <Input
                                type="text"
                                p={4}
                                border={0}
                                w={'100%'}
                                borderRadius={8}
                                bg={themes.color6}
                                color={themes.color8}
                                placeholder={placeholder}
                                _placeholder={{ color: themes.color8 }}
                                onChange={({ target }: any) => onChangeValidate(target.value)}
                                value={value as string | undefined}
                            />
                        ),
                        boolean: (
                            <HStack alignItems={'center'}>
                                <Checkbox
                                    bg={themes.color6}
                                    onChange={({ target }: any) => onChangeValidate(target.checked)}
                                    onBlur={undefined}
                                    defaultChecked={undefined}
                                    checked={undefined}
                                />
                                <FormLabel color={themes.color8} m={0}>
                                    {placeholder}
                                </FormLabel>
                            </HStack>
                        ),
                        number: (
                            <NumberInput
                                border={0}
                                w={'100%'}
                                borderRadius={8}
                                bg={themes.color6}
                                color={themes.color8}
                                placeholder={placeholder}
                                onChange={onChangeValidate}
                            >
                                <NumberInputField placeholder={placeholder} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        ),
                    }[inputType]
                }
                <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default AbiItemInput;

import { useCallback, useState } from 'react';
import { useTheme, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import Web3 from 'web3';

const web3 = new Web3();
const coder = web3.eth.abi;

export interface Props {
    type: string;
    name?: string | undefined;
    onChange: (value: string | undefined, error: Error | undefined) => void;
}

const AbiItemInput = ({ type, name, onChange }: Props) => {
    const { themes } = useTheme();
    const [error, setError] = useState<Error | undefined>();

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    const onChangeValidate = useCallback(
        (_value: string) => {
            let value = _value;

            //Empty
            if (value.length == 0) {
                setError(undefined);
                onChange(undefined, undefined);
                return;
            }

            //Address
            //TODO: Update input field value
            if (type === 'address' && Web3.utils.isAddress(value.toLowerCase())) {
                value = Web3.utils.toChecksumAddress(value);
                console.debug({ value, _value });
            }

            //Validate
            try {
                coder.encodeParameter(type, value);
            } catch (error: any) {
                setError(error);
                onChange(value, error);
                return;
            }

            //Format address if valid
            setError(undefined);
            onChange(value, undefined);
        },
        [onChange, type],
    );

    return (
        <FormControl isInvalid={!!error} pos={'relative'} mb={3}>
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
            />
            {error && <FormErrorMessage>*{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default AbiItemInput;

import { useCallback, useState } from 'react';
import Web3 from 'web3';
import InputField from '../../InputField';

const web3 = new Web3()
const coder = web3.eth.abi;

export interface Props {
    type: string;
    name: string | undefined;
    onChange: (value: string | undefined, error: Error | undefined) => void;
}

const AbiEntityInput = ({ type, name, onChange }: Props) => {
    const [error, setError] = useState<Error | undefined>();

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    const onChangeValidate = useCallback((_value: string) => {
        let value = _value;

        //Empty
        if (value.length == 0) {
            setError(undefined);
            onChange(undefined, undefined)
            return;
        }

        //Address
        //TODO: Update input field value
        if (type === 'address' && Web3.utils.isAddress(value.toLowerCase())) {
            value = Web3.utils.toChecksumAddress(value);
            console.debug({ value, _value })
        }

        //Validate
        try {
            coder.encodeParameter(type, value);
        } catch (error: any) {
            setError(error);
            onChange(value, error)
            return;
        }

        //Format address if valid
        setError(undefined);
        onChange(value, undefined);
    }, [onChange]);

    return (
        <div data-type={type} data-name={name}>
            <InputField
                placeholder={placeholder}
                errMsg={error ? error.message : undefined}
                // @ts-ignore
                onChange={({ target }: any) => onChangeValidate(target.value)}
            />
            <br />
        </div>
    );
};

export default AbiEntityInput;

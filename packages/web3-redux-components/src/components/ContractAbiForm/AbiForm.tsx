import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Box, useTheme } from '@chakra-ui/react';
import Web3 from 'web3';
import { AbiType, StateMutabilityType } from 'web3-utils';
import AbiEntityInput from './AbiEntityInput';
import { writeToContract } from './functions';
import Button from '../Button';

//Similar to AbiItem interface
interface Props {
    namePrefix: string,
    name: string,
    inputs: {
        name: string;
        type: string;
    }[],
    type: AbiType,
    stateMutability: StateMutabilityType
    handleSubmit: () => any
}

const AbiForm = ({ namePrefix = '', name, inputs = [], type = 'function', stateMutability = 'view' }: Props) => {
    const { themes } = useTheme();
    const [results, setResults] = useState({});
    const [errors, setError] = useState({});
    const [formValues, setFormValues] = useState<any>({});

    let submitButtonTitle: string;
    if (stateMutability === 'pure' || stateMutability == 'view') {
        submitButtonTitle = 'Read';
    } else {
        submitButtonTitle = 'Write';
    }

    const handleEntityChange = (name: string, value: any, type: string) => {
        setError({});
        let _value = value;

        if (type === 'address') {
            try {
                _value = Web3.utils.toChecksumAddress(value);
            } catch (err) {
                if (err) {
                    setError({
                        ...errors,
                        [name]: 'Not a valid Address',
                    });
                }
            }
        }

        setFormValues({
            ...formValues,
            [name]: {
                value: _value,
                type,
            },
        });
    };

    const resetForm = () => {
        setError({});
        setFormValues({});
    };

    const handleSubmit = (functionName: string) => {
        writeToContract({ functionName, formValues, setError, errors, resetForm, setResults });
    };

    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <span>{namePrefix}</span>
            <b>{name}</b>&nbsp;
            <i>{type}</i>
            <br />
            <br />
            <div>
                {inputs.map(({ name, type }: any, key: any) => {
                    // @ts-ignore
                    const entityErrorMsg = errors[name];

                    return (
                        <AbiEntityInput
                            key={key}
                            type={type}
                            name={name}
                            errMsg={entityErrorMsg}
                            onChange={handleEntityChange}
                        />
                    );
                })}
                <Button text={submitButtonTitle} onClick={() => handleSubmit(name)} bg={themes.color1} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {!isEmpty(results) && (
                    <Button text="Show Transaction" onClick={() => null} bg={themes.color2} />
                )}
            </div>
        </Box>
    );
};

export default AbiForm;

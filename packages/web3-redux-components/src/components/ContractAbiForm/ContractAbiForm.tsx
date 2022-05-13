import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Box, useTheme } from '@chakra-ui/react';
import Web3 from 'web3';
import AbiEntityInput from './AbiEntityInput';
import { writeToContract } from './functions';
import Button from '../Button';

//const TYPES_TO_INCLUDE = ['constructor', 'address', 'function', 'bool', 'string', 'uint8', 'uint256', 'byte'];
interface Props {
    contractEntities: any[]
}

const AbiForm = ({ contractEntities = [] }: Props) => {
    const { themes } = useTheme();
    const [results, setResults] = useState({});
    const [errors, setError] = useState({});
    const [formValues, setFormValues] = useState<any>({});

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
        <div>
            <form>
                {contractEntities.map((entity: any, key: any) => (
                    <div key={key}>
                        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
                            <span>{key + 1}.&nbsp;</span>
                            <b>{entity.name}</b>&nbsp;
                            <i>{entity.type}</i>
                            <br />
                            <br />
                            {!!entity.inputs.length && (
                                <div>
                                    {entity.inputs.map(({ name, type }: any, key: any) => {
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
                                    <Button text="Write" onClick={() => handleSubmit(entity.name)} bg={themes.color1} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {!isEmpty(results) && (
                                        <Button text="Show Transaction" onClick={() => null} bg={themes.color2} />
                                    )}
                                </div>
                            )}
                        </Box>
                        <br />
                    </div>
                ))}
            </form>
        </div>
    );
};

export default AbiForm;

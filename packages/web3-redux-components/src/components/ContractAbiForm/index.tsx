import { useState } from 'react';
import _ from 'lodash';
import { Textarea, Box, useTheme } from '@chakra-ui/react';
import Web3 from 'web3';
import AbiEntityInput from './AbiEntityInput';
import { writeToContract } from './functions';
import Button from '../Button';

const TYPES_TO_INCLUDE = ['constructor', 'address', 'function', 'bool', 'string', 'uint8', 'uint256', 'byte'];

const AbiForm = () => {
    const { themes } = useTheme();
    const [abiJSON, setABI] = useState('');
    const [errors, setError] = useState({});
    const [formValues, setFormValues] = useState<any>({});
    let contractEntities = [];

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

    try {
        contractEntities = JSON.parse(abiJSON).filter((el: any) => _.includes(TYPES_TO_INCLUDE, el.type));
    } catch (err) {
        console.error(err);
    }

    const resetForm = () => {
        setError({});
        setFormValues({});
    };

    const handleSubmit = (functionName: string) => {
        writeToContract({ functionName, formValues, setError, errors, resetForm });
    };

    return (
        <div>
            <div>
                <Textarea
                    h="180px"
                    bg={themes.color4}
                    placeholder="Place ABI JSON Here"
                    value={abiJSON}
                    // @ts-ignore
                    onChange={(e) => setABI(e.target.value)}
                />
            </div>
            <br />
            <br />
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

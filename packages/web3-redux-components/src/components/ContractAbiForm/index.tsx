import { useState } from 'react';
import _ from 'lodash';
import { Textarea, Box, useTheme } from '@chakra-ui/react';
import Web3 from 'web3';
import AbiEntityInput from './AbiEntityInput';
import Button from '../Button';
// import ContractSample from './abi.json';

const TYPES_TO_INCLUDE = ['constructor', 'address', 'function', 'bool', 'string', 'uint8', 'uint256', 'byte'];

const AbiForm = () => {
    const { themes } = useTheme();
    const [abiJSON, setABI] = useState('');
    const [errors, setError] = useState({});
    const [formValues, setFormValues] = useState<any>({});
    let contractEntities = [];

    const handleEntityChange = (name: string, value: string, type: string) => {
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

    const validate = () => {
        _.each(formValues, (contractEntity, name) => {
            switch (contractEntity.type) {
                case 'address':
                    const isAddress = Web3.utils.isAddress(contractEntity.value as string);

                    if (!isAddress) {
                        setError({
                            ...errors,
                            [name]: 'Not a valid Address',
                        });
                    }
                    break;

                default:
                    break;
            }
        });

        if (_.isEmpty(errors)) return true;
        return false;
    };

    const writeToContract = (name: string) => {
        setError({});

        if (validate()) {
            console.log('Run => ', name);
        } else {
            alert('check error msgs');
        }
    };

    try {
        contractEntities = JSON.parse(abiJSON).filter((el: any) => _.includes(TYPES_TO_INCLUDE, el.type));
    } catch (err) {
        console.error(err);
    }

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
                                    <Button
                                        text="Write"
                                        onClick={() => writeToContract(entity.name)}
                                        bg={themes.color1}
                                    />
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

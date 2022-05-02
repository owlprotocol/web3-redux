import { useState } from 'react';
import _ from 'lodash';
import { Textarea, Box, useTheme } from '@chakra-ui/react';
import AbiEntityInput from './AbiEntityInput';
import Button from '../Button';
// import ContractSample from './abi.json';

const TYPES_TO_INCLUDE = ['constructor', 'address', 'function', 'bool', 'string', 'uint8', 'uint256', 'byte'];

const AbiForm = () => {
    const { themes } = useTheme();
    const [abiJSON, setABI] = useState('');
    let contractEntities = [];

    const handleEntityChange = () => {
        // TBA
    };

    const writeToContract = () => {
        // TBA
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
                    placeholder="Place ABI JSON Here"
                    value={abiJSON}
                    // @ts-ignore
                    onChange={(e) => setABI(e.target.value)}
                    bg={themes.color4}
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
                                    {entity.inputs.map(({ name, type }: any, key: any) => (
                                        <AbiEntityInput
                                            key={key}
                                            type={type}
                                            placeholder={name}
                                            onChange={handleEntityChange}
                                        />
                                    ))}
                                    <Button text="Write" onClick={writeToContract} bg={themes.color1} />
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

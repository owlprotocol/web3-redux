import { useState } from 'react';
import _ from 'lodash';
import { Textarea, useTheme } from '@chakra-ui/react';
import ContractAbiForm from '../ContractAbiForm';
import AbiItemInput from '../AbiItemInput';

interface Props {
    networkId: string
}

const ContractAbiPage = ({ networkId }: Props) => {
    const { themes } = useTheme();
    const [address, setAddress] = useState<string | undefined>();
    const [abiJSON, setABIJSON] = useState<string | undefined>();

    //TODO: Add validation
    let abi;
    try {
        console.debug(abiJSON)
        abi = abiJSON ? JSON.parse(abiJSON) : undefined;
    } catch (error) {

    }

    return (
        <div>
            <div>
                <AbiItemInput type="address" onChange={(value) => setAddress(address)} />
                <Textarea
                    h="180px"
                    bg={themes.color4}
                    placeholder="Place ABI JSON Here"
                    value={abiJSON}
                    // @ts-ignore
                    onChange={(e) => setABIJSON(e.target.value)}
                />
            </div>
            <br />
            <br />
            {
                address && <ContractAbiForm networkId={networkId} address={address} abi={abi} />
            }
        </div>
    );
};

export default ContractAbiPage;

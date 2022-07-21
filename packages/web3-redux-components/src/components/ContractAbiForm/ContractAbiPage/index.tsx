import { useState } from 'react';
import { Box, Textarea, useTheme } from '@chakra-ui/react';
import ContractAbiForm from '../ContractAbiForm/index.js';
import AbiItemInput from '../AbiItemInput/index.js';

interface Props {
    networkId: string;
}

export const ContractAbiPage = ({ networkId }: Props) => {
    const { themes } = useTheme();
    const [address, setAddress] = useState<string | undefined>();
    const [abiJSON, setABIJSON] = useState<string | undefined>();

    //TODO: Add validation
    let abi;
    try {
        console.debug(abiJSON);
        abi = abiJSON ? JSON.parse(abiJSON) : undefined;
    } catch (error) {
        console.error(error);
    }

    return (
        <Box>
            <div>
                <AbiItemInput type="address" onChange={(value: any) => setAddress(value)} />
                <br />
                <Textarea
                    h="180px"
                    bg={themes.color4}
                    placeholder="Place ABI JSON Here"
                    value={abiJSON}
                    onChange={(e: any) => setABIJSON(e.target.value)}
                />
            </div>
            {address && <ContractAbiForm networkId={networkId} address={address} abi={abi} />}
        </Box>
    );
};

export default ContractAbiPage;

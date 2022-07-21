import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import { Box, useTheme } from '@chakra-ui/react';

export interface Props {
    networkId: string;
    address: string;
}
export const useContractCode = ({ networkId, address }: Props) => {
    const bytecode = Contract.hooks.useGetCode(networkId, address);
    return { bytecode };
};

export interface PresenterProps {
    bytecode: string;
}
export const ContractCodePresenter = ({ bytecode }: PresenterProps) => {
    const { themes } = useTheme();

    return (
        <Box border={0} p={4} borderRadius={4} w={'100%'} color={themes.color9} bg={themes.color4}>
            {bytecode}
        </Box>
    );
};

export const ContractCode = composeHooks((props: Props) => ({
    useContractCode: () => useContractCode(props),
}))(ContractCodePresenter) as (props: Props) => JSX.Element;

export default ContractCode;

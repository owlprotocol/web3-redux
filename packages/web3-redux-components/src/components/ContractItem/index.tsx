import { Box, useTheme } from '@chakra-ui/react';
import styled from 'styled-components';
import AddressDisplay from '../AddressDisplay';
import Icon from '../Icon';

const Wrapper: any = styled.div`
    display: flex;
    align-items: center;
    background-color: ${(props: any) => props.color5};
    border-radius: 12px;
    padding: 0 24px;
`;

export interface Props {
    icon: string;
    network: string;
    address: string;
    label?: string;
    interfaces?: string[];
    isFavorite?: boolean;
}

const ContractItem = ({ icon, network, address, label = '', interfaces, isFavorite = false }: Props) => {
    const { themes } = useTheme();

    return (
        <Wrapper color5={themes.color5}>
            <Box display={'flex'} alignItems={'center'} mr={4} color={themes.color9}>
                <Icon icon={icon} w={8} h={8} mr={2} />
                {network}
            </Box>
            <Box w={'60%'}>
                <AddressDisplay address={address} label={label} isFavorite={isFavorite} borderRadius={0} />
            </Box>
            <Box display={'flex'} alignItems={'center'} ml={6} color={themes.color1}>
                <span>{interfaces?.join(', ')}</span>
            </Box>
        </Wrapper>
    );
};

export default ContractItem;

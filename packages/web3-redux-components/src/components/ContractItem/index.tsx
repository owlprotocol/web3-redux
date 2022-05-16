import { Box, useTheme } from '@chakra-ui/react';
import AddressDisplay from '../AddressDisplay';
import Icon from '../Icon';

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
        <Box bg={themes.color5} display={'flex'} alignItems={'center'} p={'0 20px'} borderRadius={12}>
            <Box display={'flex'} alignItems={'center'} mr={4} color={themes.color9}>
                <Icon icon={icon} w="21px" h="21px" mr={2} />
                {network}
            </Box>
            <Box w={'65%'} flex={1}>
                <AddressDisplay address={address} label={label} isFavorite={isFavorite} borderRadius={0} />
            </Box>
            <Box display={'flex'} alignItems={'center'} ml={6} color={themes.color1}>
                <span>{interfaces?.join(', ')}</span>
            </Box>
        </Box>
    );
};

export default ContractItem;

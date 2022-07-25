import { Box, useTheme } from '@chakra-ui/react';
import { AddressDisplay } from '../Address/AddressDisplay/index.js';
import NetworkIcon from '../NetworkIcon/index.js';

export interface Props {
    network: string;
    address: string;
    label?: string;
    interfaces?: string[];
    isFavorite?: boolean;
}

const ContractItem = ({ network, address, interfaces }: Props) => {
    const { themes } = useTheme();

    return (
        <Box bg={themes.color5} display={'flex'} alignItems={'center'} p={'0 20px'} borderRadius={12}>
            <Box display={'flex'} alignItems={'center'} mr={4} color={themes.color9}>
                <Box mr={3}>
                    <NetworkIcon networkId={network} size={24} />
                </Box>
                {network}
            </Box>
            <Box w={'65%'} flex={1}>
                <AddressDisplay address={address} borderRadius={0} />
            </Box>
            <Box display={'flex'} alignItems={'center'} ml={6} color={themes.color1}>
                <span>{interfaces?.join(', ')}</span>
            </Box>
        </Box>
    );
};

export default ContractItem;

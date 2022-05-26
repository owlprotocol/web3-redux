import { useState } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import Dropdown from '../Dropdown';
import NetworkIcon from '../NetworkIcon';

const DEFAULT_CHAINS = ['ethereum', 'arbitrum', 'optimism', 'polygon', 'BNB Chain'];

export interface Props {
    options?: string[];
    handleChange?: any;
}
export const NetworkDropdown = ({ options = [], handleChange }: Props) => {
    const { themes } = useTheme();
    const [selectedNetwork, setSelectedNetwork] = useState('1');
    const _options = [...DEFAULT_CHAINS, options];

    const _onChange = (value: string) => {
        setSelectedNetwork(value);
        handleChange(value, 'networkId');
    };

    return (
        <Box display={'flex'} alignItems={'center'} borderRadius={12} bg={themes.color6} color={themes.color8}>
            <Box p={2} w={'20px'} h={'20px'}>
                <NetworkIcon networkId={selectedNetwork} />
            </Box>
            {/* @ts-ignore */}
            <Dropdown placeholder="Select a network" options={_options} onChange={_onChange} />
        </Box>
    );
};

export default NetworkDropdown;

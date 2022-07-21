import { useState } from 'react';
import { Box, Select, useTheme } from '@chakra-ui/react';
import NetworkIcon from '../NetworkIcon/index.js';

const DEFAULT_CHAINS = ['ethereum', 'arbitrum', 'optimism', 'polygon', 'BNB Chain', 'moonbeam', 'moonriver'];

export interface Props {
    options?: string[];
    handleChange?: any;
}
export const NetworkDropdown = ({ options = [], handleChange }: Props) => {
    const { themes } = useTheme();
    const [selectedNetwork, setSelectedNetwork] = useState('1');
    const _options = [...DEFAULT_CHAINS, ...options];

    const _onChange = (value: any) => {
        setSelectedNetwork(value);
        handleChange(value, 'networkId');
    };

    return (
        <Box display={'flex'} alignItems={'center'} borderRadius={12} bg={themes.color6} color={themes.color8}>
            <Box p={2}>
                <NetworkIcon networkId={selectedNetwork} />
            </Box>
            <Select
                bg={themes.color6}
                color={themes.color8}
                border={0}
                placeholder="Select a network"
                onChange={({ target }: any) => _onChange(target.value)}
                textTransform={'capitalize'}
            >
                {_options.map((item, key) => (
                    <option key={key}>{item}</option>
                ))}
            </Select>
        </Box>
    );
};

export default NetworkDropdown;

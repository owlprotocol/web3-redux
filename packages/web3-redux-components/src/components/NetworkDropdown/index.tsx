import { useState } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import Dropdown from '../Dropdown';
import NetworkIcon from '../NetworkIcon';

export interface Props {
    options: string[];
}
export const NetworkDropdown = ({ options = [] }: Props) => {
    const { themes } = useTheme();
    const [selectedNetwork, setSelectedNetwork] = useState('1');

    return (
        <Box display={'flex'} alignItems={'center'} borderRadius={4} bg={themes.color6} color={themes.color8}>
            <Box p={2}>
                <NetworkIcon networkId={selectedNetwork} />
            </Box>
            <Dropdown placeholder="Select a network" options={options} onChange={setSelectedNetwork} />
        </Box>
    );
};

export default NetworkDropdown;

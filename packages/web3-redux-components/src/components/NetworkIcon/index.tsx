import { Box } from '@chakra-ui/react';
import { ReactComponent as EthereumIcon } from './icons/eth.svg';
import { ReactComponent as OptimismIcon } from './icons/optimism.svg';
import { ReactComponent as ArbitrumIcon } from './icons/arbitrum.svg';
import { ReactComponent as PolygonIcon } from './icons/polygon.svg';
import { ReactComponent as MoonbeamIcon } from './icons/moonbeam.svg';
import { ReactComponent as MoonriverIcon } from './icons/moonriver.svg';

export interface Props {
    networkId?: number | string | undefined;
    size?: number | string | undefined;
}
export const NetworkIcon = ({ networkId = '1', size = 30 }: Props) => {
    const IconSelect = (icon: number | string) => {
        switch (icon) {
            case '1':
            case 'ethereum':
                return <EthereumIcon />;
            case '10':
            case 'optimism':
                return <OptimismIcon />;
            case '42161':
            case 'arbitrum':
                return <ArbitrumIcon />;
            case '137':
            case 'polygon':
                return <PolygonIcon />;
            case 'moonbeam':
                return <MoonbeamIcon />;
            case 'moonriver':
                return <MoonriverIcon />;
        }
    };

    return <Box boxSize={`${size}px`}>{IconSelect(String(networkId).toLowerCase())}</Box>;
};

export default NetworkIcon;

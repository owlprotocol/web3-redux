import { ReactComponent as EthereumIcon } from './icons/eth.svg';
import { ReactComponent as OptimismIcon } from './icons/optimism.svg';
import { ReactComponent as ArbitrumIcon } from './icons/arbitrum.svg';
import { ReactComponent as MaticIcon } from './icons/matic.svg';

export interface Props {
    networkId?: number | string | undefined;
}
export const NetworkIcon = ({ networkId = '1' }: Props) => {
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
                return <MaticIcon />;
        }
    };

    return <>{IconSelect(String(networkId).toLowerCase())}</>;
};

export default NetworkIcon;

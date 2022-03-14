import styled from 'styled-components';
import { ReactComponent as EthereumIcon } from './icons/eth.svg';
import { ReactComponent as OptimismIcon } from './icons/optimism.svg';
import { ReactComponent as ArbitrumIcon } from './icons/arbitrum.svg';
import { ReactComponent as MaticIcon } from './icons/matic.svg';

const Wrapper = styled.div``;

const IconSelect = (icon: string) => {
    switch (icon) {
        case '1':
            return <EthereumIcon />;
        case '10':
            return <OptimismIcon />;
        case '42161':
            return <ArbitrumIcon />;
        case '137':
            return <MaticIcon />;
    }
};

export interface Props {
    networkId: string;
}

export const NetworkIcon = ({ networkId }: Props) => <Wrapper>{IconSelect(networkId)}</Wrapper>;

export default NetworkIcon;

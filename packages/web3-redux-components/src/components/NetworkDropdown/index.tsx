import { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Network, Config } from '@owlprotocol/web3-redux';
import { ActiveChainDot } from './styles';
import NetworkIcon from '../NetworkIcon';

export const NetworkDropdown = ({ }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const networks = Network.useNetworks() as Network.Network[];
    const [activeNetworkId, setNetworkId] = Config.useNetworkId();
    const activeNetwork = Network.useNetwork(activeNetworkId);

    return (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Dropdown width="165px" isOpen={open} toggle={toggle}>
            <DropdownToggle caret>
                {activeNetwork ? (
                    <>
                        <NetworkIcon networkId={activeNetwork.networkId} />
                        <span>{activeNetwork.name}</span>
                    </>
                ) : (
                    <span>Select a network</span>
                )}
            </DropdownToggle>
            <DropdownMenu>
                {networks.map(({ networkId, name }, idx) => (
                    <DropdownItem key={idx} className="list-item" onClick={() => setNetworkId(networkId)}>
                        <NetworkIcon networkId={networkId} />
                        <span>{name}</span>
                        {activeNetworkId === networkId && <ActiveChainDot />}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default NetworkDropdown;

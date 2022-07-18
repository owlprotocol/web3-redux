import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => {
    const metamask = new MetaMask({ actions });
    return metamask;
});

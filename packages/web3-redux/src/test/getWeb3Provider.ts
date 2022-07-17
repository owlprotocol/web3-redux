//import ganache from 'ganache-core';
import { network } from 'hardhat';
export const getWeb3Provider = () => {
    //return ganache.provider();
    return network.provider;
};

export default getWeb3Provider;

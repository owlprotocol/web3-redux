import ganache from 'ganache-core';

export const getWeb3Provider = () => {
    return ganache.provider();
};

export default getWeb3Provider;

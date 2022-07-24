import { useNetwork } from './useNetwork';

export const useDefaultNetworks = () => {
    useNetwork('1', true);
    useNetwork('42161', true);
    useNetwork('10', true);
    useNetwork('137', true);
    useNetwork('1337', true);
};

import { useSelector } from 'react-redux';
import { selectByIdSingle as selectContractSend } from '../selectors/index.js';

/**
 * Reads block from store and makes a call to fetch block.
 * @category Hooks
 * */
export const useContractSend = (
    id: string | undefined,
) => {
    const contractSend = useSelector((state) => selectContractSend(state, id));
    return contractSend;
};

export default useContractSend;

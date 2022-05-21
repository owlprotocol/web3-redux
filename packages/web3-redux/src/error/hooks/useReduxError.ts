import { useSelector } from 'react-redux';
import { selectByIdSingle as selectReduxError } from '../selectors/index.js';

/**
 * @category Hooks
 * */
export const useReduxError = (
    id: string | undefined,
) => {
    const reduxError = useSelector((state) => selectReduxError(state, id));
    return reduxError;
};

export default useReduxError;

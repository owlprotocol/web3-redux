import { useSelector } from 'react-redux';
import { selectConfig } from '../selectors';

/**
 * @category Hooks
 * Returns the Config.withId(0)
 */
export function useConfig() {
    const value = useSelector(selectConfig);
    return value;
}

export default useConfig;

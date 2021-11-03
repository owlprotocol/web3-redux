import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import selectLatestBlockNumber from '../selectors/selectLatestBlockNumber';

export default function useLatestBlockNumber(networkId: string | undefined) {
    const value = useSelector((state: any) => selectLatestBlockNumber(state, networkId));
    useDebugValue({ value });
    return value;
}

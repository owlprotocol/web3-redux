import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import selectLatestBlock from '../selectors/selectLatestBlock';

export default function useLatestBlock(networkId: string | undefined) {
    const value = useSelector((state: any) => selectLatestBlock(state, networkId));
    useDebugValue({ value });
    return value;
}

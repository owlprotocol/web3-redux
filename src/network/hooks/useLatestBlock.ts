import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { selectLatestBlock } from '../selector';

export default function useLatestBlock(networkId?: string) {
    const value = useSelector((state: any) => selectLatestBlock(state, networkId));
    useDebugValue({ value });
    return value;
}

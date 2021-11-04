import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import selectByIdSingle from '../selectors/selectByIdSingle';

export default function useByIdSingle(id: Parameters<typeof selectByIdSingle>[1]) {
    const selected = useSelector((state) => selectByIdSingle(state, id));
    useDebugValue({ id, selected });
    return selected;
}

import { useCallback, useState } from 'react';

export function useArray<T = any>(length: number) {
    const [array, setArray] = useState<T[]>(new Array(length));

    const setItemAtIdx = useCallback(
        (item: any, idx: number) => {
            const copy = [...array];
            copy[idx] = item;
            setArray(copy);
        },
        [array],
    );

    return [array, setItemAtIdx, setArray] as [T[], (item: T, idx: number) => void, (itemArr: T[]) => void];
}

export default useArray;

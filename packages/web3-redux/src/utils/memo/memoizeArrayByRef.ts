import { memoizeWeak } from './memoWeak';

const memoizeParamsByRef = memoizeWeak((...items: any[]) => {
    return [...items];
});

export const memoizeArrayByRef = (items: any[]) => memoizeParamsByRef(...items);

export default memoizeArrayByRef;

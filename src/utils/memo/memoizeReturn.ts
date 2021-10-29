import memoize from 'fast-memoize';

//TODO: memoizeNestedByRef
//Returns old reference if object values are the same, uses fast-memoize (JSON.stringify cache)
const memoizeReturn = memoize((x: any) => {
    return x;
});

export default memoizeReturn;

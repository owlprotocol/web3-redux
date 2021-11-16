//Adapted from https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/

//Function yields results
//@ts-expect-error
function* combinationUtil(arr: any[], data: any[], start: number, end: number, index: number, r: number) {
    // Current combination is ready to be printed, print it
    if (index == r) {
        yield data.slice(0, r);
    }

    // replace index with all possible elements. The condition
    // "end-i+1 >= r-index" makes sure that including one element
    // at index will make a combination with remaining elements
    // at remaining positions
    for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
        data[index] = arr[i];
        yield* combinationUtil(arr, data, i + 1, end, index + 1, r);
    }
}

// The main function that prints all combinations of size r
// in arr[] of size n. This function mainly uses combinationUtil()
export function* combinationGen(arr: any[], r: number) {
    const n = arr.length;
    // A temporary array to store all combination one by one
    const data = new Array(r);
    // Get all combination using temporary array 'data[]'
    yield* combinationUtil(arr, data, 0, n - 1, 0, r);
}

export function combination(arr: any[], r: number) {
    return [...combinationGen(arr, r)];
}

export function combinationAll(arr: any[]) {
    const result = [];
    for (let i = 0; i <= arr.length; i++) {
        result.push(...combinationGen(arr, i));
    }

    return result;
}

export default combination;

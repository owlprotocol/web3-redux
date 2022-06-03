async function asyncGeneratorToArray<T>(gen: AsyncIterable<T>): Promise<T[]> {
    const arr: T[] = [];
    for await (const x of gen) {
        arr.push(x);
    }

    return arr;
}

export default asyncGeneratorToArray;

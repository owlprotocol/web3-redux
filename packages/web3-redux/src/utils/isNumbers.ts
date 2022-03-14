export function isNumbers(array: number[] | any[]): array is number[] {
    return array.length > 0 && typeof array[0] === 'number';
}

export default isNumbers;

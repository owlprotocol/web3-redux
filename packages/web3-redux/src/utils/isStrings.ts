export function isStrings(array: string[] | any[]): array is string[] {
    return array.length > 0 && typeof array[0] === 'string';
}

export default isStrings;

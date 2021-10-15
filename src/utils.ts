export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function createAction<ActionType, ActionInput>(type: ActionType) {
    return (payload: ActionInput) => {
        return {
            type,
            payload,
        };
    };
}

export function isNumbers(array: number[] | any[]): array is number[] {
    return array.length > 0 && typeof array[0] === 'number';
}

export function isStrings(array: string[] | any[]): array is string[] {
    return array.length > 0 && typeof array[0] === 'string';
}

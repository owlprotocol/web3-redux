import { validateTransactionHash } from './searchUtils';

test('validateTransactionHash - return false for fake hash', () => {
    const string = 'asdasd';
    //@ts-expect-error
    expect(validateTransactionHash(string)).toBe(false);
});

test('validateTransactionHash - return true for real hash', () => {
    const string = '0xa2d8f066392c48f2e413ffdbd93e5d1200c990f390cf93d7de83c01c66929315';
    //@ts-expect-error
    expect(validateTransactionHash(string)).toBe(true);
});

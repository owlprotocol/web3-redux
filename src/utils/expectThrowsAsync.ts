import { expect } from 'chai';

export async function expectThrowsAsync(method: () => Promise<unknown>, errorMessage: string) {
    let error: Error | undefined;
    try {
        await method();
    } catch (err) {
        error = err as Error;
    }
    expect(error).to.be.an(Error.name);
    if (errorMessage) {
        expect(error?.message).to.equal(errorMessage);
    }
}

export default expectThrowsAsync;

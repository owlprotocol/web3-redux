export const isMetaMaskInstalled = () => {
    if ('ethereum' in window) {
        //@ts-expect-error
        return Boolean((window.ethereum as any).isMetaMask);
    }
    return false;
};

export default isMetaMaskInstalled;

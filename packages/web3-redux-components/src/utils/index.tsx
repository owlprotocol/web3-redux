import Web3 from 'web3';

const { toBN, fromWei } = Web3.utils;

export const shortenHashLength = (account: string, length: number) =>
    `${account.substring(0, length)}...${account.substring(account.length - 0)}`;

export const shortenHash = (account: string) => shortenHashLength(account, 8);

export { toBN, fromWei };

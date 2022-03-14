import Web3 from 'web3/types/index.d.js';

export function mineBlock(web3: Web3) {
    return new Promise((resolve) => {
        //@ts-ignore
        web3?.currentProvider.send({ method: 'evm_mine', params: [] }, resolve);
    });
}

export function mineBlocks(web3: Web3, count = 1) {
    const promises: any[] = [];
    for (let i = 0; i < count; i++) {
        const p = mineBlock(web3);
        promises.push(p);
    }

    return Promise.all(promises);
}

export default mineBlocks;

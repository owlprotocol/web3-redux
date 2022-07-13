/* eslint-disable import/no-commonjs */
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

/*
import type { HardhatUserConfig } from 'hardhat/types/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-web3';
*/
require('@typechain/hardhat');
require('@nomiclabs/hardhat-web3');

const config = {
    solidity: '0.8.9',
    networks: {
        hardhat: {
            chainId: 1336,
        },
    },
    paths: {
        artifacts: 'src/artifacts',
    },
    //@ts-ignore
    typechain: {
        outDir: 'src/typechain', //default
        target: 'web3-v1', //All options: ethers-v5, web3-v1, truffle-v5
    },
};

//export default config;
exports.default = config;

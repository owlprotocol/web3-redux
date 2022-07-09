/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import { HardhatUserConfig } from 'hardhat/types/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-web3';

const config: HardhatUserConfig = {
    solidity: '0.8.9',
    networks: {},
    paths: {
        artifacts: 'src/artifacts',
    },
    //@ts-ignore
    typechain: {
        outDir: 'src/typechain', //default
        target: 'web3-v1', //All options: ethers-v5, web3-v1, truffle-v5
    },
};

export default config;

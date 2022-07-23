/* eslint-disable import/no-commonjs */
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config = {
    solidity: '0.8.9',
    networks: {
        hardhat: {
            chainId: 1336,
        },
    },
};

//export default config;
exports.default = config;

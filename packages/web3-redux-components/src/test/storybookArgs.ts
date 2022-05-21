import { TestData } from '@owlprotocol/web3-redux';
const { ADDRESS_0, VITALIK, WETH, USDC, TETHER, CHAINLINK, KITH_FRIENDS, OZ_TEAM, SKYWEAVER, VEE_FRIENDS_SERIES2 } =
    TestData;

const networkLabels = {
    [1]: '1 - Ethereum',
    [10]: '10 - Optimism',
    [137]: '137 - Polygon',
    [42161]: '42161 - Arbitrum',
    [1337]: '1337 - Ganache',
};
export const networkIdArgType = {
    options: Object.keys(networkLabels),
    control: {
        type: 'select',
        labels: networkLabels,
    },
};

const addressLabels = {
    [ADDRESS_0]: `ZERO - ${ADDRESS_0}`,
    [WETH]: `WETH - ${WETH}`,
    [USDC]: `USDC - ${USDC}`,
    [TETHER]: `TETHER - ${TETHER}`,
    [CHAINLINK]: `LINK - ${CHAINLINK}`,
    [VITALIK]: `VITALIK ${VITALIK}`,
};
export const addressArgType = {
    options: Object.keys(addressLabels),
    control: {
        type: 'select',
        labels: addressLabels,
    },
};

const addressERC20Labels = {
    [WETH]: `WETH - ${WETH}`,
    [USDC]: `USDC - ${USDC}`,
    [TETHER]: `TETHER - ${TETHER}`,
    [CHAINLINK]: `LINK - ${CHAINLINK}`,
};
export const addressERC20ArgType = {
    options: Object.keys(addressLabels),
    control: {
        type: 'select',
        labels: addressERC20Labels,
    },
};

const addressERC721Labels = {
    [VEE_FRIENDS_SERIES2]: `${VEE_FRIENDS_SERIES2} - Vee Friends Series 2`,
    [OZ_TEAM]: `${OZ_TEAM} - OpenZeppelin Team`,
};
export const addressERC721ArgType = {
    options: Object.keys(addressERC721Labels),
    control: {
        type: 'select',
        labels: addressERC721Labels,
    },
};

const addressERC1155Labels = {
    [KITH_FRIENDS]: `${KITH_FRIENDS} - Kith Friends`,
    [SKYWEAVER]: `${SKYWEAVER} - SkyWeaver (Polygon)`,
};
export const addressERC1155ArgType = {
    options: Object.keys(addressERC1155Labels),
    control: {
        type: 'select',
        labels: addressERC1155Labels,
    },
};

export const locationHashArgType = {
    options: ['#transactions', '#code'],
    control: { type: 'select' },
};

export const transactionHashArgType = {
    options: ['0x54cd74ed523ba9757a9c521f75a9669709c55546f5c3302cd9f04604b1caa9ea'],
    control: { type: 'select' },
};

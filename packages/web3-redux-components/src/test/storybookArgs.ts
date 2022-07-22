import { TestData } from '@owlprotocol/web3-redux';
const {
    VITALIK,
    WETH,
    USDC,
    TETHER,
    CHAINLINK,
    KITH_FRIENDS,
    OZ_TEAM,
    SKYWEAVER,
    VEE_FRIENDS_SERIES2,
    QM_BAYC_PNG,
    QM_SQUARE_BLUE_JPG,
    QM_SQUARE_BLUE_PDF,
    QM_SQUARE_BLUE_PNG,
    QM_SQUARE_BLUE_SVG,
    QM_SQUARE_GIF,
    QM_HELLO_JSON,
    CRYPTO_OWLS,
    OWL_PARTS,
    POTATOZ,
} = TestData;

const ipfsHashLabels = {
    [QM_BAYC_PNG]: 'bayc.png',
    [QM_SQUARE_BLUE_PNG]: 'blue-square.png',
    [QM_SQUARE_BLUE_JPG]: 'blue-square.jpg',
    [QM_SQUARE_BLUE_SVG]: 'blue-square.svg',
    [QM_SQUARE_BLUE_PDF]: 'blue-square.pdf',
    [QM_SQUARE_GIF]: 'square.gif',
    [QM_HELLO_JSON]: 'hello.json',
};
export const ipfsHashdArgType = {
    options: Object.keys(ipfsHashLabels),
    control: {
        type: 'select',
        labels: ipfsHashLabels,
    },
};

export const mimeTypeArgType = {
    options: ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif', 'application/pdf'],
    control: {
        type: 'select',
    },
};

const networkLabels = {
    [1]: '1 - Ethereum',
    [10]: '10 - Optimism',
    [137]: '137 - Polygon',
    [42161]: '42161 - Arbitrum',
    [1336]: '1336 - Ganache',
};
export const networkIdArgType = {
    options: Object.keys(networkLabels),
    control: {
        type: 'select',
        labels: networkLabels,
    },
};

const addressLabels = {
    //[ADDRESS_0]: `ZERO - ${ADDRESS_0}`,
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
    [POTATOZ]: `${POTATOZ} - The Potatoz`,
    [CRYPTO_OWLS]: `${CRYPTO_OWLS} - Crypto Owls`,
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
    [OWL_PARTS]: `${OWL_PARTS} - OWL_PARTS`,
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

import { TestData } from '@owlprotocol/web3-redux';
const { ADDRESS_0, VITALIK, WETH, USDC, TETHER, CHAINLINK } = TestData;

export const networkIdArgType = {
    options: ['1', '10', '137', '200'],
    control: { type: 'select' },
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

export const locationHashArgType = {
    options: ['#transactions', '#code'],
    control: { type: 'select' },
};

export const transactionHashArgType = {
    options: ['0x54cd74ed523ba9757a9c521f75a9669709c55546f5c3302cd9f04604b1caa9ea'],
    control: { type: 'select' },
};

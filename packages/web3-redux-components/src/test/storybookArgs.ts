//import { ADDRESS_0, VITALIK, WETH } from '@owlprotocol/web3-redux/test/data';

const ADDRESS_0 = '';
const VITALIK = '';
const WETH = '';
export const networkIdArgType = {
    options: ['1'],
    control: { type: 'select' },
};

const addressLabels = {
    [ADDRESS_0]: `ZERO - ${ADDRESS_0}`,
    [WETH]: `WETH - ${WETH}`,
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

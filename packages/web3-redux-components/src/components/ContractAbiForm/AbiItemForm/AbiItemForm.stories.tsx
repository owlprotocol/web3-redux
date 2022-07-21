import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi, TestData } from '@owlprotocol/web3-redux';
import type { AbiItem } from 'web3-utils';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import AbiItemForm from '.';

export default {
    title: 'ContractAbi/AbiItemForm',
    component: AbiItemForm,
} as ComponentMeta<typeof AbiItemForm>;

const Template: ComponentStory<typeof AbiItemForm> = (args: any) => <AbiItemForm {...args} />;
const address = TestData.USDC;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const totalSupplyAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'totalSupply')!;
const {
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
} = totalSupplyAbi as AbiItem;
export const TotalSupply = Template.bind({});
TotalSupply.args = {
    networkId: '1',
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
};
TotalSupply.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'balanceOf')!;
const {
    name: nameBalanceOf,
    inputs: inputsBalanceOf,
    type: typeBalanceOf,
    stateMutability: stateMutabilityBalanceOf,
} = balanceOfAbi as AbiItem;
export const BalanceOf = Template.bind({});
BalanceOf.args = {
    networkId: '1',
    address,
    namePrefix: '1. ',
    name: nameBalanceOf,
    inputs: inputsBalanceOf,
    type: typeBalanceOf,
    stateMutability: stateMutabilityBalanceOf,
};
BalanceOf.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const transferAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'transfer')!;
const { name, inputs, type, stateMutability } = transferAbi as AbiItem;
export const Transfer = Template.bind({});
Transfer.args = {
    networkId: '1',
    address,
    namePrefix: '2. ',
    name,
    inputs,
    type,
    stateMutability,
};
Transfer.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export const UndefinedNetwork = Template.bind({});
UndefinedNetwork.args = {
    networkId: undefined,
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
};

export const NonExistentNetwork = Template.bind({});
NonExistentNetwork.args = {
    networkId: '42',
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
};
NonExistentNetwork.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export const UndefinedContract = Template.bind({});
UndefinedContract.args = {
    networkId: '1',
    address: undefined,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
};
UndefinedContract.argTypes = {
    networkId: networkIdArgType,
};

export const NonExistentContract = Template.bind({});
NonExistentContract.args = {
    networkId: '1',
    address: '0x0',
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply,
    type: typeTotalSupply,
    stateMutability: stateMutabilityTotalSupply,
};
NonExistentContract.argTypes = {
    networkId: networkIdArgType,
    address: {
        options: ['0x0'],
        control: { type: 'select' },
    },
};

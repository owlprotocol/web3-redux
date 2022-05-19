import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi, TestData } from '@owlprotocol/web3-redux';
import { AbiItem } from 'web3-utils';
import AbiItemForm from '.';

export default {
    title: 'ContractAbi/AbiItemForm',
    component: AbiItemForm,
} as ComponentMeta<typeof AbiItemForm>;

const Template: ComponentStory<typeof AbiItemForm> = (args: any) => <AbiItemForm {...args} />;

const address = TestData.WETH;

//0x08638ef1a205be6762a8b935f5da9b700cf7322c
//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const totalSupplyAbi = Abi.IERC20.abi.find((a) => a.name === 'totalSupply')!;
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

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Abi.IERC20.abi.find((a) => a.name === 'balanceOf')!;
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

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const transferAbi = Abi.IERC20.abi.find((a) => a.name === 'transfer')!;
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

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi } from '@owlprotocol/web3-redux'
import { AbiItem } from 'web3-utils';
import AbiForm from './AbiForm';

export default {
    title: 'ContractInteraction/AbiForm',
    component: AbiForm,
} as ComponentMeta<typeof AbiForm>;

const Template: ComponentStory<typeof AbiForm> = (args: any) => <AbiForm {...args} />;

export const BalanceOf = Template.bind({});
//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Abi.IERC20.abi.find((a) => a.name === 'balanceOf')!;
const { name: nameBalanceOf, inputs: inputsBalanceOf, type: typeBalanceOf, stateMutability: stateMutabilityBalanceOf } = balanceOfAbi as AbiItem;
BalanceOf.args = {
    namePrefix: '1. ',
    name: nameBalanceOf,
    inputs: inputsBalanceOf,
    type: typeBalanceOf,
    stateMutability: stateMutabilityBalanceOf
};

export const Transfer = Template.bind({});
//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const transferAbi = Abi.IERC20.abi.find((a) => a.name === 'transfer')!;
const { name, inputs, type, stateMutability } = transferAbi as AbiItem;
Transfer.args = {
    namePrefix: '2. ',
    name,
    inputs,
    type,
    stateMutability
};

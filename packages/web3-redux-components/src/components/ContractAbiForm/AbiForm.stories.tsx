import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi } from '@owlprotocol/web3-redux'
import { AbiItem } from 'web3-utils';
import AbiForm from './AbiForm';

export default {
    title: 'ContractInteraction/AbiForm',
    component: AbiForm,
} as ComponentMeta<typeof AbiForm>;

const Template: ComponentStory<typeof AbiForm> = (args: any) => <AbiForm {...args} />;
export const ERC20 = Template.bind({});

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Abi.IERC20.abi.find((a) => a.name === 'balanceOf')!;
const { name, inputs, type, stateMutability } = balanceOfAbi as AbiItem;

ERC20.args = {
    namePrefix: '1. ',
    name,
    inputs,
    type,
    stateMutability
};

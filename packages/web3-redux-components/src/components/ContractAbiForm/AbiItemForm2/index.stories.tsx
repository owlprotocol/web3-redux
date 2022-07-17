import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi } from '@owlprotocol/web3-redux';
import type { AbiItem } from 'web3-utils';
import AbiItemForm from '.';

export default {
    title: 'ContractAbi/AbiItemForm2',
    component: AbiItemForm,
} as ComponentMeta<typeof AbiItemForm>;

const Template: ComponentStory<typeof AbiItemForm> = (args: any) => <AbiItemForm {...args} />;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const totalSupplyAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'totalSupply')!;
const { inputs: inputsTotalSupply } = totalSupplyAbi as AbiItem;
export const TotalSupply = Template.bind({});
TotalSupply.args = {
    inputs: inputsTotalSupply,
};

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'balanceOf')!;
const { inputs: inputsBalanceOf } = balanceOfAbi as AbiItem;
export const BalanceOf = Template.bind({});
BalanceOf.args = {
    inputs: inputsBalanceOf,
};
//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const transferAbi = Abi.IERC20Artifact.abi.find((a: any) => a.name === 'transfer')!;
const { inputs } = transferAbi as AbiItem;
export const Transfer = Template.bind({});
Transfer.args = {
    inputs,
};

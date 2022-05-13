import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi, TestData } from '@owlprotocol/web3-redux'
import ContractAbiForm from './ContractAbiForm';
import { AbiItem } from 'web3-utils';

export default {
    title: 'ContractInteraction/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;
export const ERC20 = Template.bind({});

const address = TestData.WETH;
const abi = Abi.IERC20.abi as AbiItem[];

ERC20.args = {
    networkId: '1',
    address,
    abi
};

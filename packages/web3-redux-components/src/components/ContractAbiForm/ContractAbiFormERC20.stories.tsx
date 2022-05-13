import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi } from '@owlprotocol/web3-redux'
import ContractAbiForm from './ContractAbiForm';

export default {
    title: 'ContractInteraction/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;
export const ERC20 = Template.bind({});

const abi = Abi.IERC20.abi;

ERC20.args = {
    contractEntities: abi
};

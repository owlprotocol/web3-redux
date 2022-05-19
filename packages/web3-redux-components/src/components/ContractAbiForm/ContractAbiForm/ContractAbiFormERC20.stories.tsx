import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi, TestData } from '@owlprotocol/web3-redux';
import ContractAbiForm from '.';

export default {
    title: 'ContractAbi/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;

export const ERC20Read = Template.bind({});
ERC20Read.args = {
    networkId: '1',
    address: TestData.WETH,
    abi: Abi.IERC20.abi as any[],
};

const VEE_FRIENDS_2 = '0x9378368ba6b85c1FbA5b131b530f5F5bEdf21A18';

export const ERC721Read = Template.bind({});
ERC721Read.args = {
    networkId: '1',
    address: VEE_FRIENDS_2,
    abi: Abi.IERC721.abi as any[],
};

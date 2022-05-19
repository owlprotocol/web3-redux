import { ComponentStory, ComponentMeta } from '@storybook/react';
// @ts-ignore
import { Abi, TestData } from '@owlprotocol/web3-redux';
import { AbiItem } from 'web3-utils';
import ContractAbiForm from '.';

export default {
    title: 'ContractAbi/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;

// @ts-ignore
export const ERC20Read = Template.bind({});
ERC20Read.args = {
    networkId: '1',
    address: TestData.WETH,
    // @ts-ignore
    abi: Abi.IERC20.abi as AbiItem[],
};

const VEE_FRIENDS_2 = '0x9378368ba6b85c1FbA5b131b530f5F5bEdf21A18';

// @ts-ignore
export const ERC721Read = Template.bind({});
ERC721Read.args = {
    networkId: '1',
    address: VEE_FRIENDS_2,
    // @ts-ignore
    abi: Abi.IERC721.abi as AbiItem[],
};

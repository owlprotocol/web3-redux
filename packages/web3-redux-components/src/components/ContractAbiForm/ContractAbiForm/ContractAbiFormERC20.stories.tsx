import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abi, TestData } from '@owlprotocol/web3-redux';
import {
    addressERC1155ArgType,
    addressERC20ArgType,
    addressERC721ArgType,
    networkIdArgType,
} from '../../../test/storybookArgs.js';
import ContractAbiForm from '.';

export default {
    title: 'ContractAbi/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;

export const ERC20 = Template.bind({});
ERC20.args = {
    networkId: '1',
    address: TestData.WETH,
    abi: Abi.IERC20Artifact.abi as any[],
};
ERC20.argTypes = {
    networkId: networkIdArgType,
    address: addressERC20ArgType,
};

export const ERC721 = Template.bind({});
ERC721.args = {
    networkId: '1',
    address: TestData.VEE_FRIENDS_SERIES2,
    abi: Abi.IERC721Artifact.abi as any[],
};
ERC721.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};

export const ERC1155 = Template.bind({});
ERC1155.args = {
    networkId: '1',
    address: TestData.KITH_FRIENDS,
    abi: Abi.IERC1155Artifact.abi as any[],
};
ERC1155.argTypes = {
    networkId: networkIdArgType,
    address: addressERC1155ArgType,
};

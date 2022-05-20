import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import ERC1155Instance from '.';
import { addressERC1155ArgType, networkIdArgType } from '../../../test/storybookArgs';

export default {
    title: 'NFT/ERC1155Instance',
    component: ERC1155Instance,
} as ComponentMeta<typeof ERC1155Instance>;

const Template: ComponentStory<typeof ERC1155Instance> = (args: any) => <ERC1155Instance {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '137',
    address: TestData.SKYWEAVER,
    tokenId: '1'
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC1155ArgType
}

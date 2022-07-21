import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.ts';
import ERC721Instance from '.';

export default {
    title: 'NFT/ERC721Instance',
    component: ERC721Instance,
} as ComponentMeta<typeof ERC721Instance>;

const Template: ComponentStory<typeof ERC721Instance> = (args: any) => <ERC721Instance {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    address: TestData.OZ_TEAM,
    tokenId: '1',
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721OwnerOf } from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721OwnerOf',
    component: ERC721OwnerOf,
} as ComponentMeta<typeof ERC721OwnerOf>;

const Template: ComponentStory<typeof ERC721OwnerOf> = (args: any) => <ERC721OwnerOf {...args} />;

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

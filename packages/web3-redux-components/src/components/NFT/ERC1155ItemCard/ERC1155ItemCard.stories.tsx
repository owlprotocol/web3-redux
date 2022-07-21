import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC1155ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import ERC1155ItemCard from '.';

export default {
    title: 'NFT/ERC1155ItemCard',
    component: ERC1155ItemCard,
} as ComponentMeta<typeof ERC1155ItemCard>;

const Template: ComponentStory<typeof ERC1155ItemCard> = (args: any) => <ERC1155ItemCard {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '137',
    address: TestData.SKYWEAVER,
    tokenId: '1',
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC1155ArgType,
};

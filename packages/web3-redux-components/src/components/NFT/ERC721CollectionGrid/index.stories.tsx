import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs';
import ERC721CollectionGrid from '.';

export default {
    title: 'NFT/ERC721CollectionGrid',
    component: ERC721CollectionGrid,
} as ComponentMeta<typeof ERC721CollectionGrid>;

const Template: ComponentStory<typeof ERC721CollectionGrid> = (args: any) => <ERC721CollectionGrid {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    address: TestData.OZ_TEAM,
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721CollectionGrid } from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721CollectionGrid',
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

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC1155ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC1155Image } from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC1155/ERC1155Image',
    component: ERC1155Image,
} as ComponentMeta<typeof ERC1155Image>;

const Template: ComponentStory<typeof ERC1155Image> = (args: any) => <ERC1155Image {...args} />;

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

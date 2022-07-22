import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721Image } from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721Image',
    component: ERC721Image,
} as ComponentMeta<typeof ERC721Image>;

const Template: ComponentStory<typeof ERC721Image> = (args: any) => <ERC721Image {...args} />;

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

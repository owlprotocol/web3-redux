import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721Instance } from './index.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721Instance',
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

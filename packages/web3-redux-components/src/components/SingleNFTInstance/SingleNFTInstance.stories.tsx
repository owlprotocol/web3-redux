import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { SingleNFTInstance } from '.';
import { networkIdArgType } from '../../test/storybookArgs';

export default {
    title: 'NFT/SingleNFTInstance',
    component: SingleNFTInstance,
} as ComponentMeta<typeof SingleNFTInstance>;

const Template: ComponentStory<typeof SingleNFTInstance> = (args: any) => <SingleNFTInstance {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    address: TestData.OZ_TEAM,
    tokenId: '1'
};
Main.argTypes = {
    networkId: networkIdArgType
}

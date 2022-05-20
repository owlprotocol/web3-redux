import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SingleNFTInstancePresenter } from '.';
import { networkIdArgType } from '../../test/storybookArgs';

export default {
    title: 'NFT/SingleNFTInstancePresenter',
    component: SingleNFTInstancePresenter,
} as ComponentMeta<typeof SingleNFTInstancePresenter>;

const Template: ComponentStory<typeof SingleNFTInstancePresenter> = (args: any) => <SingleNFTInstancePresenter {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    itemName: 'NFT Name',
    ownerOf: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    price: '0.050',
    isSelected: false,
};

export const Secondary = Template.bind({});

Secondary.args = {
    networkId: networkIdArgType.options[0],
    itemName: 'NFT Name',
    ownerOf: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    isSelected: false,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../test/storybookArgs';
import NFTInstancePresenter from '.';

export default {
    title: 'NFT/NFTInstancePresenter',
    component: NFTInstancePresenter,
} as ComponentMeta<typeof NFTInstancePresenter>;

const Template: ComponentStory<typeof NFTInstancePresenter> = (args: any) => <NFTInstancePresenter {...args} />;

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

export const Editable = Template.bind({});

Editable.args = {
    networkId: networkIdArgType.options[0],
    itemName: 'NFT Name',
    price: '10',
    editable: true,
};

export const Preview = Template.bind({});

Preview.args = {
    itemName: 'NFT Name',
};

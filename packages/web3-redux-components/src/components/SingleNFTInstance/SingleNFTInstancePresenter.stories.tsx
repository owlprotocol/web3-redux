import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SingleNFTInstancePresenter } from '.';

export default {
    title: 'NFT/SingleNFTInstancePresenter',
    component: SingleNFTInstancePresenter,
} as ComponentMeta<typeof SingleNFTInstancePresenter>;

const Template: ComponentStory<typeof SingleNFTInstancePresenter> = (args: any) => <SingleNFTInstancePresenter {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: 'NFT Name',
    ownerOf: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    price: '0.050',
    isSelected: false,
    token: 'ETH',
};

export const Secondary = Template.bind({});

Secondary.args = {
    itemName: 'NFT Name',
    ownerOf: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    isSelected: false,
    token: 'ETH',
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import SingleNFTInstance from '.';

export default {
    title: 'NFT/SingleNFTInstance',
    component: SingleNFTInstance,
} as ComponentMeta<typeof SingleNFTInstance>;

const Template: ComponentStory<typeof SingleNFTInstance> = (args: any) => <SingleNFTInstance {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: 'NFT Name',
    ownerAddress: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    price: '0.050',
    isSelected: false,
    token: 'ETH',
};

export const Secondary = Template.bind({});

Secondary.args = {
    itemName: 'NFT Name',
    ownerAddress: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    isSelected: false,
    token: 'ETH',
};

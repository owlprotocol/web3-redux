import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { AddressFavoriteButton, AddressFavoriteButtonProps } from './index.js';

const Template: ComponentStory<typeof AddressFavoriteButton> = (args: any) => <AddressFavoriteButton {...args} />;
export const Main = Template.bind({});

const Args: AddressFavoriteButtonProps = {
    networkId: networkIdArgType.options[0],
    address: addressERC721ArgType.options[0],
};

Main.args = Args;
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Address/AddressFavoriteButton',
    component: AddressFavoriteButton,
} as ComponentMeta<typeof AddressFavoriteButton>;

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressArgType } from '../../../test/storybookArgs.js';
import { AddressDropdown, AddressDropdownProps } from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'Address/AddressDropdown',
    component: AddressDropdown,
} as ComponentMeta<typeof AddressDropdown>;

const Template: ComponentStory<typeof AddressDropdown> = (args: any) => <AddressDropdown {...args} />;
export const Main = Template.bind({});

const Args: AddressDropdownProps = {
    address: addressArgType.options,
};

Main.args = Args;

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddressDisplay, AddressDisplayProps } from './AddressDisplay.js';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';

const Template: ComponentStory<typeof AddressDisplay> = (args: any) => <AddressDisplay {...args} />;
export const Main = Template.bind({});

const Args: AddressDisplayProps = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
    controls: ['copy'],
};

Main.args = Args;
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
    controls: {
        control: 'check',
        options: ['qr', 'copy', 'favorite', 'edit', 'icon'],
    },
};

export default {
    title: 'Address/AddressDisplay',
    component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

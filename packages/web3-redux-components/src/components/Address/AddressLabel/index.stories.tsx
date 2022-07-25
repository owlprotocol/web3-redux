import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { AddressLabel, AddressLabelProps } from './index.js';

const Template: ComponentStory<typeof AddressLabel> = (args: any) => <AddressLabel {...args} />;
export const Main = Template.bind({});

const Args: AddressLabelProps = {
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
    title: 'Address/AddressLabel',
    component: AddressLabel,
} as ComponentMeta<typeof AddressLabel>;

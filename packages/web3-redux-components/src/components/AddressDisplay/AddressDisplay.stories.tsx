import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplay, { Props } from './AddressDisplay';
import { addressArgType, networkIdArgType } from '../../test/storybookArgs';

const Template: ComponentStory<typeof AddressDisplay> = (args: any) => <AddressDisplay {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
};

Main.args = Args;
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export default {
    title: 'Address/AddressDisplay',
    component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

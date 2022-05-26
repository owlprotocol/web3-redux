import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressArgType } from '../../test/storybookArgs';
import AddressDisplay, { Props } from '.';

const Template: ComponentStory<typeof AddressDisplay> = (args: any) => <AddressDisplay {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    address: addressArgType.options[0],
    label: 'Main',
    isFavorite: false,
};

Main.args = Args;
Main.argTypes = {
    address: addressArgType,
};

export default {
    title: 'Address/AddressDisplayOld',
    component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

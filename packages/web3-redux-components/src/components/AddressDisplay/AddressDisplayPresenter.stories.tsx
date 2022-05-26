import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplayPresenter, { Props } from './AddressDisplayPresenter';
import { addressArgType } from '../../test/storybookArgs';

const Template: ComponentStory<typeof AddressDisplayPresenter> = (args: any) => <AddressDisplayPresenter {...args} />;
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
    title: 'Address/AddressDisplayPresenter',
    component: AddressDisplayPresenter,
} as ComponentMeta<typeof AddressDisplayPresenter>;

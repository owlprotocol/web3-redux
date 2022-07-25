import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplayPresenter, { AddressDisplayPresenterProps } from './AddressDisplayPresenter.js';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';

const Template: ComponentStory<typeof AddressDisplayPresenter> = (args: any) => <AddressDisplayPresenter {...args} />;
export const Main = Template.bind({});
export const Alt = Template.bind({});

const Args: AddressDisplayPresenterProps = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
    label: 'Main',
    isFavorite: false,
};

Main.args = Args;
Main.argTypes = {
    address: addressArgType,
};

const AltArgs: AddressDisplayPresenterProps = {
    address: addressArgType.options[0],
    networkId: '1',
    controls: ['copy', 'icon'],
    containerStyles: {
        h: '30px',
    },
};
Alt.args = AltArgs;

export default {
    title: 'Address/AddressDisplayPresenter',
    component: AddressDisplayPresenter,
} as ComponentMeta<typeof AddressDisplayPresenter>;

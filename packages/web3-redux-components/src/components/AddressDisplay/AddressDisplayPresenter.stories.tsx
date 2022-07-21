import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplayPresenter, { Props } from './AddressDisplayPresenter/index.js';
import { addressArgType } from '../../test/storybookArgs.ts';

const Template: ComponentStory<typeof AddressDisplayPresenter> = (args: any) => <AddressDisplayPresenter {...args} />;
export const Main = Template.bind({});
export const Alt = Template.bind({});

const Args: Props = {
    address: addressArgType.options[0],
    label: 'Main',
    isFavorite: false,
};

Main.args = Args;
Main.argTypes = {
    address: addressArgType,
};

const AltArgs: Props = {
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

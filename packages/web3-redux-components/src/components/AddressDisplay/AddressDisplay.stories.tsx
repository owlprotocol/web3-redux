import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplay, { Props } from '.';

const Template: ComponentStory<typeof AddressDisplay> = (args: any) => <AddressDisplay {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    address: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
    label: 'Main',
    isFavorite: false,
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'AddressDisplay/AddressDisplay',
    component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

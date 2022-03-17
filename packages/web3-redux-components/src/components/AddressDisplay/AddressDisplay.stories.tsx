import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressDisplay, { Props } from '.';

const Template: ComponentStory<typeof AddressDisplay> = (args: any) => <AddressDisplay {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    address: '0x63CD72389dc25DaF9A5c5016a4a6487',
    label: 'Main',
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'AddressDisplay/AddressDisplay',
    component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

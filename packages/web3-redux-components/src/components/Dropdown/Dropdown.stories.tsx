import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '.';

export default {
    title: 'Atoms/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args: any) => <Dropdown {...args} />;
export const Main = Template.bind({});

Main.args = {
    options: ['admin', 'minter', 'editor'],
    placeholder: 'Role Name',
    isDisabled: false,
};

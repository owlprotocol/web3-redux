import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';

export default {
    title: 'Atoms/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;
export const Main = Template.bind({});

Main.args = {
    icon: 'pencil',
    text: '',
    w: '45',
    h: '45',
    iconW: '10',
    iconH: '10',
    bg: '',
};

export const WithText = Template.bind({});

WithText.args = {
    icon: 'pencil',
    text: 'Click Here',
    w: '200',
    h: '45',
    iconW: '5',
    iconH: '5',
    bg: 'blue',
};

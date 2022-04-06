import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';

export default {
    title: 'Atoms/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;
export const Main = Template.bind({});

Main.args = {
    icon: 'heart',
};

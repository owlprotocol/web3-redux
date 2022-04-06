import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon, { ICONS } from '.';

export default {
    title: 'Graphics/Icons',
    component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Main = Template.bind({});

Main.args = {
    icon: 'ETH',
};

Main.argTypes = {
    icon: {
        options: Object.keys(ICONS),
        control: { type: 'select' },
    },
};

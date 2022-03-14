import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '.';

export default {
    title: 'Graphics/Icons',
    component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Coins = Template.bind({});

Coins.args = {
    icon: 'ETH',
};

Coins.argTypes = {
    icon: {
        options: ['BCH', 'BTC', 'ETH', 'DOCE', 'LTC', 'XRP'],
        control: { type: 'select' },
    },
};

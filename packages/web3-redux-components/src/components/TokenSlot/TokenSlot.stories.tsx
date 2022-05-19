import { ComponentStory, ComponentMeta } from '@storybook/react';
import TokenSlot from '.';

export default {
    title: 'NFT/TokenSlot',
    component: TokenSlot,
} as ComponentMeta<typeof TokenSlot>;

const Template: ComponentStory<typeof TokenSlot> = (args: any) => <TokenSlot {...args} />;

export const Main = Template.bind({});

Main.args = {
    token: 'ETH',
    value: '0',
    dollarValue: '0',
    isSelected: false,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withThemeProvider } from '../../hoc';
import TokenSlot from '.';

const Wrapper = withThemeProvider((props: any) => {
    return <TokenSlot {...props} />;
});

export default {
    title: 'NFT/TokenSlot',
    component: TokenSlot,
} as ComponentMeta<typeof TokenSlot>;

const Template: ComponentStory<typeof TokenSlot> = (args: any) => <Wrapper {...args} />;

export const Main = Template.bind({});

Main.args = {
    token: 'ETH',
    value: '0',
    dollarValue: '0',
    isSelected: false,
};

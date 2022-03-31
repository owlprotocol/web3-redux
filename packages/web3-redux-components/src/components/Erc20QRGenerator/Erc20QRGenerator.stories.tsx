import { ComponentStory, ComponentMeta } from '@storybook/react';
import Erc20QRGenerator, { Props } from '.';

const Template: ComponentStory<typeof Erc20QRGenerator> = (args: any) => <Erc20QRGenerator {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    address: '0xf6AEfc54843FDA83437D67A2DbEc7A9BB834ff4E',
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'Erc20/Erc20QRGenerator',
    component: Erc20QRGenerator,
} as ComponentMeta<typeof Erc20QRGenerator>;

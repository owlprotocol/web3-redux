import { ComponentMeta, ComponentStory } from '@storybook/react';
import { addressArgType, networkIdArgType } from '../../test/storybookArgs';

import { ERC20Display } from '.';

const Template: ComponentStory<typeof ERC20Display> = (args: any) => <ERC20Display {...args} />;
export const Main = Template.bind({});
Main.args = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export default {
    title: 'Components/ERC20Display',
    component: ERC20Display,
} as ComponentMeta<typeof ERC20Display>;

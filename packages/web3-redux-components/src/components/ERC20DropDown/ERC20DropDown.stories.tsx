import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType, addressArgType } from '../../test/storybookArgs.js';
import { ERC20DropDown, Props } from '.';

export default {
    title: 'ERC20/ERC20DropDown',
    component: ERC20DropDown,
    argTypes: {
        networkId: networkIdArgType,
        accountAddress: addressArgType,
    },
    args: {
        networkId: networkIdArgType.options[0],
        accountAddress: addressArgType.options[0],
    } as Props,
} as ComponentMeta<typeof ERC20DropDown>;

const Template: ComponentStory<typeof ERC20DropDown> = (args: any) => <ERC20DropDown {...args} />;
export const Main = Template.bind({});

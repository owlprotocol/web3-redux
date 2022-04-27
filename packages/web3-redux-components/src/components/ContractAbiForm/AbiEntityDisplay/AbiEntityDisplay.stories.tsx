import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbiEntityDisplay from '.';

export default {
    title: 'ContractAbiForm/AbiEntityDisplay',
    component: AbiEntityDisplay,
} as ComponentMeta<typeof AbiEntityDisplay>;

const Template: ComponentStory<typeof AbiEntityDisplay> = (args: any) => <AbiEntityDisplay {...args} />;
export const Main = Template.bind({});

Main.args = {};

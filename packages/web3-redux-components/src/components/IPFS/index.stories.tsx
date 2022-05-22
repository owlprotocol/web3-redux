import { ComponentStory, ComponentMeta } from '@storybook/react';
import IPFSButton from '.';

export default {
    title: 'IPFS/IPFSButton',
    component: IPFSButton,
} as ComponentMeta<typeof IPFSButton>;

const Template: ComponentStory<typeof IPFSButton> = (args: any) => <IPFSButton {...args} />;
export const Main = Template.bind({});
Main.args = {};

Main.argTypes = {};

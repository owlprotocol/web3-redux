import { ComponentStory, ComponentMeta } from '@storybook/react';
import IPFSWriteImage from '.';

export default {
    title: 'IPFS/IPFSWriteImage',
    component: IPFSWriteImage,
} as ComponentMeta<typeof IPFSWriteImage>;

const Template: ComponentStory<typeof IPFSWriteImage> = (args: any) => <IPFSWriteImage {...args} />;
export const Main = Template.bind({});
Main.args = {};

Main.argTypes = {};

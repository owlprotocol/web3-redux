import { ComponentStory, ComponentMeta } from '@storybook/react';
import IPFSReadImage from '.';

export default {
    title: 'IPFS/IPFSReadImage',
    component: IPFSReadImage,
} as ComponentMeta<typeof IPFSReadImage>;

const Template: ComponentStory<typeof IPFSReadImage> = (args: any) => <IPFSReadImage {...args} />;
export const Main = Template.bind({});
Main.args = {
    cid: 'QmNwbd7ctEhGpVkP8nZvBBQfiNeFKRdxftJAxxEdkUKLcQ',
};
Main.argTypes = {};

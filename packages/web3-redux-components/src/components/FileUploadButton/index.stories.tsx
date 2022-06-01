import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileUploadButton from '.';

export default {
    title: 'IPFS/FileUploadButton',
    component: FileUploadButton,
} as ComponentMeta<typeof FileUploadButton>;

const Template: ComponentStory<typeof FileUploadButton> = (args: any) => <FileUploadButton {...args} />;
export const Main = Template.bind({});
Main.args = {};

Main.argTypes = {};

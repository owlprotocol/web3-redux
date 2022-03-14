import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../test/storybookArgs';
import NetworkIcon from '.';

export default {
    title: 'Graphics/NetworkIcon',
    component: NetworkIcon,
    args: { networkId: networkIdArgType.options[0] },
    argTypes: {
        networkId: networkIdArgType,
    },
} as ComponentMeta<typeof NetworkIcon>;

const Template: ComponentStory<typeof NetworkIcon> = (args: any) => <NetworkIcon {...args} />;
export const Main = Template.bind({});

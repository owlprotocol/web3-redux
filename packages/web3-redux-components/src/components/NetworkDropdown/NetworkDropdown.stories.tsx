import { ComponentStory, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import NetworkDropdown from './index';

export default {
    title: 'Network/NetworkDropdown',
    component: NetworkDropdown,
} as ComponentMeta<typeof NetworkDropdown>;

const Template: ComponentStory<typeof NetworkDropdown> = (args) => <NetworkDropdown {...args} />;
export const Main = Template.bind({});

export const Demo = {
    play: async ({ args, canvasElement }: any) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));
        await expect(args.onClick).toHaveBeenCalled();
    },
};

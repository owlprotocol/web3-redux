import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withThemeProvider } from '../../hoc';
import SingleNFTInstance from '.';

const Wrapper = withThemeProvider((props: any) => {
    return <SingleNFTInstance {...props} />;
});

export default {
    title: 'NFT/SingleNFTInstance',
    component: SingleNFTInstance,
} as ComponentMeta<typeof SingleNFTInstance>;

const Template: ComponentStory<typeof SingleNFTInstance> = (args: any) => <Wrapper {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: 'Name',
    owner: 'Owner',
    price: '0.050',
    isSelected: false,
};

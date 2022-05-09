export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {},
}

export const decorators = [
    (Story) => {
        return (
            <Story />
        )
    }
];

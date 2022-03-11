module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        /*
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
            },
        },
        */
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-scss',
        {
            name: '@storybook/preset-create-react-app',
            options: {
                scriptsPackageName: 'react-scripts',
            },
        },
    ],
    /*
    core: {
        builder: 'webpack5'
    },
    features: {
        storyStoreV7: true,
    },
    */
    //https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config
    webpack: async (config) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        config.node = { ...(config.node ?? {}), fs: 'empty' } //https://github.com/motdotla/dotenv/issues/233
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }, {
            test: /\.wasm$/,
            loaders: ['wasm-loader']
        }
        );
        return config;
    },
};

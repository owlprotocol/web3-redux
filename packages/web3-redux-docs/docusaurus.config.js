// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight'); //github
const darkCodeTheme = require('prism-react-renderer/themes/vsDark'); //dracula
const webPackPlugin = require('./docusaurusWebpack5Plugin')

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Web3 Redux',
    tagline: 'Redux for Web3',
    url: 'https://owlprotocol.github.io',
    baseUrl: '/web3-redux/',
    deploymentBranch: 'gh-pages',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'owlprotocol', // Usually your GitHub org/user name.
    plugins: [
        //@ts-expect-error
        webPackPlugin,
        //https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc
        [
            'docusaurus-plugin-typedoc',
            {
                // Typedoc options
                entryPoints: ["../web3-redux/src"],
                out: "web3-redux-reference",
                tsconfig: '../web3-redux/tsconfig.json',
                watch: process.env.TYPEDOC_WATCH === "true" || process.env.TYPEDOC_WATCH === '1',
                readme: 'none',
                // Plugin options
                sidebar: {
                    categoryLabel: 'Reference',
                }
            }
        ],
        /*
        [
            'docusaurus-plugin-typedoc',
            {
                entryPoints: ["../web3-redux-components/src"],
                out: "web3-redux-components-reference",
                tsconfig: '../web3-redux-components/tsconfig.json',
                watch: process.env.TYPEDOC_WATCH,
                readme: 'none',
                sidebar: {
                    categoryLabel: 'Reference',
                }
            }
        ],
        */

    ],
    projectName: 'web3-redux', // Usually your repo name.
    themes: ['@docusaurus/theme-live-codeblock'],
    presets: [
        [
            '@docusaurus/preset-classic',
            //'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/owlprotocol/web3-redux/tree/master/docusaurus',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Web3 Redux',
                logo: {
                    alt: 'Web3 Redux Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'web3-redux-quickstart/index',
                        position: 'left',
                        label: 'Quickstart',
                    },
                    {
                        type: 'doc',
                        docId: 'web3-redux-reference/index',
                        position: 'left',
                        label: 'Reference',
                    },
                    /*
                    {
                        type: 'docsVersionDropdown',
                    },
                    */
                    {
                        href: 'https://github.com/owlprotocol/web3-redux',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Quickstart',
                        items: [
                            {
                                label: 'Quickstart',
                                to: '/docs/web3-redux-quickstart',
                            },
                        ],
                    },
                    {
                        title: 'Reference',
                        items: [
                            {
                                label: 'Reference',
                                to: '/docs/web3-redux-reference',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            /*
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/owlprotocol',
                            },
                            */
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/owlprotocol',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/owlprotocol/web3-redux',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Owl Labs. Built with Docusaurus.`,
            },
            prism: {
                theme: darkCodeTheme,
                darkTheme: darkCodeTheme,
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
        }),
};

module.exports = config;

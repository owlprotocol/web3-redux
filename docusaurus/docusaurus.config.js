// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
        //https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc
        [
            'docusaurus-plugin-typedoc',
            {
                // Typedoc options
                entryPoints: ["../src"],
                out: "web3-redux-reference",
                tsconfig: '../tsconfig.json',
                watch: process.env.TYPEDOC_WATCH,
                readme: 'none',
                // Plugin options
                sidebar: {
                    categoryLabel: 'Reference',
                }
            }
        ],

    ],
    projectName: 'web3-redux', // Usually your repo name.

    presets: [
        [
            'classic',
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
                    {
                        type: 'docsVersionDropdown',
                    },
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
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gamium',
  tagline: 'Automate game testing sdk',
  url: 'https://gamium.dogutech.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dogu-team', // Usually your GitHub org/user name.
  projectName: 'gamium', // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: 'gh-docs',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/dogu-team/gamium/tree/main/docs',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Gamium Docs',
        logo: {
          alt: 'Gamium Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'docs/get-started/introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'api/api-reference',
            position: 'left',
            label: 'API',
          },
          {
            href: 'https://blog.dogutech.io/tag/gamium',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/dogu-team/gamium',
            html: '<img src=https://cdn-icons-png.flaticon.com/512/25/25231.png style="width: 32px; height: 32px; margin: auto; display:block;"></img>',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/get-started/introduction',
              },
              {
                label: 'API Reference',
                to: '/api/api-reference',
              },
            ],
          },
          {
            title: 'Services',
            items: [
              {
                label: 'Dogu Console',
                href: 'https://dogutech.io',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dogu-team/gamium',
              },
              {
                label: 'Blog',
                href: 'https://blog.dogutech.io/tag/gamium/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dogu Technologies, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
      algolia: {
        appId: 'Z64JW7L04L',
        apiKey: '4e59d4bed7018a2b2130676ec6f82a9f',
        indexName: 'gamium-dogutech',
      },
    }),
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;

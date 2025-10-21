import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hgraph Docs',
  tagline: 'Official documentation for Hgraph SDKs, APIs and other services.',
  favicon: 'img/favico.png',

  // Set the production url of your site here
  url: 'https://docs.hgraph.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hgraph-io', // Usually your GitHub org/user name.
  projectName: 'hgraph-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hgraph-io/hgraph-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-KPHT8JR9R3',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  
  

  themeConfig: {
    // Replace with your project's social card
    image: 'img/hgraph_docs_social_image.jpg',
    navbar: {
      hideOnScroll: true,
      title: '',
      logo: {
        alt: 'Hgraph Logo',
        src: 'img/hgraph_docs_dark.svg',
        srcDark: 'img/hgraph_docs_light.svg'
      },
      items: [
        {to: 'https://hgraph.com/', label: 'Features', position: 'left'},
        {to: '/overview/pricing', label: 'Pricing', position: 'left'},
        {to: '/graphql-assistant', label: 'AI Assistant', position: 'left'},
        {to: '/overview/contact', label: 'Contact', position: 'left'},
        {
          href: 'https://dashboard.hgraph.com',
          label: 'Account',
          position: 'right',
        },
        
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        {
          title: 'Quick links',
          items: [
            {
              label: 'About',
              to: '/overview/about',
            },
            {
              label: 'Contact',
              to: '/overview/contact',
            },
            {
              label: 'Enterprise',
              to: '/overview/services#enterprise',
            },
            {
              label: 'Brand',
              to: '/resources/brand',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hgraph-io',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/hgraph_io',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/dwxpRHHVWX',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/hgraph_io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Account dashboard',
              href: 'https://dashboard.hgraph.com',
            },
            {
              label: 'Newsletter',
              href: 'https://hgraph.beehiiv.com/subscribe',
            },
            {
              label: 'Blog',
              href: 'https://www.hgraph.com/blog',
            },
            {
              label: 'Pricing',
              href: 'https://www.hgraph.com/pricing',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hgraph LLC.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'GTV3VK7V3B',

      // Public API key: it is safe to commit it
      apiKey: '861faf9a1d7bb4f35f45e57641462567',

      indexName: 'hgraph',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

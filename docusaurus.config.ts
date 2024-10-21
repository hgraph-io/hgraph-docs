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
          // Update this to your repo
          editUrl:
            'https://github.com/hgraph-io/hgraph-docs/edit/main/', // Points to your repository for editing
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  

  themeConfig: {
    // Replace with your project's social card
    image: 'img/Hgraph-Docs-Card.png',
    navbar: {
      hideOnScroll: true,
      title: 'Hgraph Docs',
      logo: {
        alt: 'Hgraph Logo',
        src: 'img/Hgraph-Logomark_Dark.svg',
        srcDark: 'img/Hgraph-Logomark_White.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Getting started',
        },
        {to: '/blog', label: 'FAQ', position: 'left'},
        {
          label: 'Support',
          href: 'https://discord.gg/dwxpRHHVWX',
          position: 'left'
        },
        {
          href: 'https://dashboard.hgraph.com',
          label: 'Account Dashboard',
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
              label: 'Getting started',
              to: '/docs/intro',
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
              label: 'Blog',
              href: 'https://www.hgraph.com/blog',
            },
            {
              label: 'Pricing',
              href: 'https://www.hgraph.com/pricing',
            },
            {
              label: 'Contact',
              href: 'https://form.typeform.com/to/LUnKkmRL',
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
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      '@tanstack/react-query': '../node_modules/@tanstack/react-query',
      '@tanstack/react-query-devtools':
        '../node_modules/@tanstack/react-query-devtools',
      nuqs: '../node_modules/nuqs',
      'nuqs/adapters/next/app': '../node_modules/nuqs/adapters/next/app',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@tanstack/react-query': '../node_modules/@tanstack/react-query',
      '@tanstack/react-query-devtools':
        '../node_modules/@tanstack/react-query-devtools',
      nuqs: '../node_modules/nuqs',
      'nuqs/adapters/next/app': '../node_modules/nuqs/adapters/next/app',
    };
    return config;
  },
};

module.exports = nextConfig;

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      '@tanstack/react-query': '../node_modules/@tanstack/react-query',
      '@tanstack/react-query-devtools':
        '../node_modules/@tanstack/react-query-devtools',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@tanstack/react-query': '../node_modules/@tanstack/react-query',
      '@tanstack/react-query-devtools':
        '../node_modules/@tanstack/react-query-devtools',
    };
    return config;
  },
};

module.exports = nextConfig;

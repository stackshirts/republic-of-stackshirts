const withPlugins = require('next-compose-plugins');
const withMDX = require('@zeit/next-mdx');
const optimizedImages = require('next-optimized-images');


module.exports = withPlugins([
  [optimizedImages],
  [
    withMDX, {
      options: {}
    }
  ]
], {
  pageExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'mdx'
  ],
  webpack(config) {
    return config;
  }
});


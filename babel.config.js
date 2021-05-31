module.exports = api => {
  api.cache.forever();
  return {
    presets: [
      'next/babel',
    ],
    sourceMaps: true,
    plugins: [
      ['prismjs', {
        'languages': ['yaml'],
        'plugins': [],
        'theme': 'okaidia'
      }],
      ['styled-components', {
        ssr: true,
        displayName: false,
        fileName: false,
        transpileTemplateLiterals: false,
        minify: false,
      }],
      ['module-resolver', {
        'root': ['./'],
        'alias': {
          'src': './src',
        }
      }]
    ],
  };
};


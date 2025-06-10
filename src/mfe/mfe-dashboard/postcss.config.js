import purgecssModule from '@fullhuman/postcss-purgecss';

const purgecss = purgecssModule.default || purgecssModule.purgeCSSPlugin;

export default {
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.vue', './src/**/*.js', './src/**/*.ts'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};

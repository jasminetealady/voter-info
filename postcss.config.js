const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html'],
    }),
    tailwind,
    autoprefixer,
  ],
};

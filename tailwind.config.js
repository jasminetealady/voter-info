module.exports = {
  theme: {
    fontFamily: {
      body: ['brandon-grotesque'],
    },
    extend: {
      colors: {
        lightbg: '#F9F7F9',
        blue: '#5385d4',
        red: '#E45C61',
        purple: '#524179e3',
        green: '#81d29d',
        lightblue: '#f3f5ff',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
};

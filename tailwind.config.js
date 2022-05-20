const spacing = (() => {
  return Array
    .from({ length: 81 }, (_v, i) => i)
    .reduce((obj, space) => {
      obj[space] = `${space}px`;
      return obj;
    }, {});
})();

const colors = {
  "custom-black-12": "#121212",

  "custom-gray-77": "#777",
  "custom-gray-33": "#333",
  "custom-gray-bb": "#bbb",
  
  "custom-pink": "#ff1493",
}

module.exports = {
  content: [
    "./src/**/*",
  ],
  theme: {
    spacing,
    extend: {
      colors,
    },
  },
  plugins: [],
}
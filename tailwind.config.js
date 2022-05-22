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
  "custom-gray-6c": "#6C6C6C",

  "custom-green-94": "#94D983",
  "custom-green-38": "#38A014",

  "custom-yellow": "#E7E997",

  "custom-pink": "#FFA8A8",
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

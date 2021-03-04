// For more infomation please click here https://github.com/svg/svgo
module.exports = {
  js2svg: {
    indent: 2,
    pretty: true
  },
  plugins: [
    {
      // Remove attributes by pattern.
      name: "removeAttrs",
      params: {
        // Filtering rules
        attrs: "(fill-rule|fill)"
      }
    }
  ]
};

export default {
  plugins: {
    "postcss-import": {},
    "postcss-url": {
      url: "inline",
      encodeType: "base64",
    },
    "postcss-preset-env": {},
    cssnano: {},
  },
};

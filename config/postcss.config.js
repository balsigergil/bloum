// Production PostCSS config use to compile the final CSS file
export default {
  plugins: {
    "postcss-import": {},
    "postcss-url": {
      url: "inline",
      encodeType: "base64",
    },
    "postcss-preset-env": {
      features: {
        "oklab-function": false,
      },
    },
    cssnano: {},
  },
};

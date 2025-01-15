export default {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    tailwindcss: {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": false,
      },
    },
    cssnano: {},
  },
};

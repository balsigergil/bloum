export default {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
  },
};

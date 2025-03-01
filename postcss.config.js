// This configuration is only used by Storybook.
// The main PostCSS configuration for bundling is in the config directory.
export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": false,
      },
    },
  },
};

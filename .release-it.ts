import type { Config } from "release-it";

export default {
  git: {
    commitMessage: "chore(release): ${version}",
  },
  github: {
    release: true,
    releaseName: "v${version}",
    draft: true,
  },
  npm: {
    publish: false,
  },
  hooks: {
    "before:init": ["npm run build"],
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: "conventionalcommits",
      infile: "CHANGELOG.md",
    },
  },
} satisfies Config;

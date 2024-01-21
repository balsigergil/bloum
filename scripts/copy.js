// Copy all javascript and css from dist to docs/static/dist

import { copySync } from "fs-extra/esm";
import path from "node:path";

const src = path.resolve("dist");
const dest = path.resolve("docs/static/dist");

copySync(src, dest);

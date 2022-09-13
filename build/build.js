import { build } from "esbuild";
import fs from "fs";
import path from "path";

const srcPath = "./src/";
const distDir = "./dist";

// create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// copy HTML template
fs.copyFileSync("./index.html", distDir + "/index.html");

// copy css
fs.copyFileSync(srcPath + "/index.css", distDir + "/index.css");

// copy web manifest
fs.copyFileSync("./manifest.webmanifest", distDir + "/manifest.webmanifest");

// build && watch (rebuild on file changes)
const entry = path.join(srcPath, "index.js");
build({
  entryPoints: [entry],
  bundle: true,
  loader: { ".svg": "dataurl" },
  outdir: distDir,
  watch: true,
})
  .catch(() => process.exit(1))
  .then((result) => {
    console.log("watching...");
  });

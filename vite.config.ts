import { defineConfig } from "vite";
import { existsSync } from "fs";
import glob from "fast-glob";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import exercises from "./exercises.json";

const entryPoints: Record<string, string> = {};

for await (const file of glob.stream("src/*/setup-*.ts", { cwd: __dirname })) {
  const nameStart = file.lastIndexOf("/setup-") + "/setup-".length;
  const nameEnd = file.length - ".ts".length;

  const name = file.toString().substring(nameStart, nameEnd);
  if (name && existsSync(`${__dirname}/pages/${name}.html`)) {
    entryPoints[name] = `${name}.html`;
    console.log(`+++++++ ${name} => ${file}`);
  } else console.warn(`------- ${name} has no HTML page.`);
}

for (const exercise of exercises) {
  for (const [name, entry] of Object.entries(exercise.entries)) {
    if (name in entryPoints) {
      entry["exists"] = true;
      exercise["exists"] = true;
    }
  }
}

export default defineConfig(() => ({
  plugins: [ViteEjsPlugin(() => ({ exercises }))],
  root: "pages",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: entryPoints,
    },
  },
  publicDir: "../public",
  resolve: {
    alias: {
      "/node_modules": "../node_modules",
      "/src": "../src",
    },
  },
}));

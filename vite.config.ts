import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, writeFile } from "fs";
import glob from "fast-glob";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import exercises from "./exercises.json";

const root = dirname(fileURLToPath(import.meta.url));

const entryPoints: Record<string, string> = {};

const setupScriptRegex = /src\/(\d\d)\/setup-(\w+).ts/;
const setupScriptFiles = glob.sync("src/+([0-9])/setup-*.ts");

const setupScriptAliases: Record<string, string> = {};

for (const filename of setupScriptFiles) {
  const match = setupScriptRegex.exec(filename);
  if (!match) continue;

  const num = match[1];
  const name = match[2];

  const setupScriptName = resolve(root, `src/${num}/setup-${name}.ts`);

  if (existsSync(setupScriptName)) {
    entryPoints[name] = resolve(root, `pages/${name}.html`);
    setupScriptAliases[name] = setupScriptName;

    console.log("+++++++ " + name + " => " + `./src/${num}/setup-${name}.ts`);
  } else {
    console.log("------- " + name + " does not exist.");
  }
}

for (const exercise of exercises) {
  for (const [name, entry] of Object.entries(exercise.entries)) {
    if (name in setupScriptAliases) {
      entry["exists"] = true;
      exercise["exists"] = true;
    }
  }
}

const exerciseAliases = createExerciseAliases(setupScriptAliases);

export default defineConfig({
  plugins: [
    ViteEjsPlugin({
      exercises,
    }),
  ],
  root: resolve(root, "pages"),
  build: {
    outDir: resolve(root, "dist"),
    rollupOptions: {
      input: entryPoints,
    },
  },
  publicDir: resolve(root, "public"),
  resolve: {
    alias: {
      ...exerciseAliases,
      "/~": resolve(root, "node_modules"),
      "/src": resolve(root, "src"),
    },
  },
});

function createExerciseAliases(setupScriptAliases: Record<string, string>) {
  const aliasEntries = Object.entries(setupScriptAliases);
  createTsconfig(aliasEntries);
  return Object.fromEntries(
    aliasEntries.map(([alias, file]) => [`/@${alias}`, file])
  );
}

function createTsconfig(aliasEntries: [string, string][]) {
  const tsConfigStart = `{
  "compilerOptions": {
    "paths": {
      "/~/*": ["./node_modules/*"]`;
  const tsConfigEnd = `
    }
  }
}`;
  const aliasTsconfig =
    aliasEntries.reduce(
      (result, [alias, file], i) =>
        `${result},\n      "/@${alias}": ["${file}"]`,
      tsConfigStart
    ) + tsConfigEnd;
  writeFile(resolve(root, ".aliases.tsconfig.json"), aliasTsconfig, () => {});
}

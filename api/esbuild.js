import esbuild from "esbuild";

const [, , ...args] = process.argv;

/**
 * @type import("esbuild").BuildOptions
 */
const options = {
  bundle: true,
  entryPoints: ["src/main.ts"],
  format: "esm",
  outfile: "build/main.js",
  platform: "node",
  sourcemap: true,
};

if (args.includes("--watch")) {
  const ctx = await esbuild.context(options);
  ctx.watch();
} else {
  await esbuild.build(options);
}

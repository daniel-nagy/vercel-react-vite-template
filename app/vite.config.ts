import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { renameIndexFile } from "./vite-plugin-rename-index-file";
import { ssr } from "./vite-plugin-ssr";

type EntryModule = typeof import("./src/main_server");

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "../build",
    sourcemap: "hidden",
  },
  envDir: "../",
  plugins: [
    react(),
    renameIndexFile("main.html"),
    ssr({
      entryFile: "./src/main_server.tsx",
      indexFile: "./src/index.html",
      async render({ render }: EntryModule, indexHtml, req, res) {
        const host = req.headers["x-forwarded-host"] ?? req.headers.host;
        const url = `http://${host}${req.originalUrl}`;

        const {
          context,
          headers = {},
          html,
        } = await render(indexHtml, url, req.headers.cookie);

        Object.entries(headers).forEach(([key, value]) =>
          res.setHeader(key, value)
        );

        res.statusCode = context.pageNotFound ? 404 : 200;

        return html;
      },
    }),
  ],
  root: "src",
  server: {
    port: 3000,
  },
});

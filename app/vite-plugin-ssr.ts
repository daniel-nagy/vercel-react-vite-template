import { readFileSync } from "node:fs";
import { type ServerResponse } from "node:http";
import { extname } from "node:path";
import { Readable } from "node:stream";
import { createGzip } from "node:zlib";
import { type Connect, type Plugin } from "vite";

type Input = {
  entryFile: string;
  indexFile: string;
  render(
    entryModule: unknown,
    indexHTML: string,
    req: Connect.IncomingMessage,
    res: ServerResponse
  ): string | Promise<string>;
};

export const ssr = ({ entryFile, indexFile, render }: Input): Plugin => ({
  apply: "serve",
  name: "ssr",
  configureServer(server) {
    return () => {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        if (!req.headers.host) return next();

        const url = new URL(req.url, `http://${req.headers.host}`);

        if (extname(url.pathname) && url.pathname !== "/index.html")
          return next();

        const indexHtml = await server.transformIndexHtml(
          req.originalUrl!,
          readFileSync(indexFile, "utf-8")
        );

        const entry = await server.ssrLoadModule(entryFile);
        const html = await render(entry, indexHtml, req, res);
        const stream = new Readable();

        res
          .setHeader("Content-Encoding", "gzip")
          .setHeader("Content-type", "text/html; charset=UTF-8");

        stream.push(html);
        stream.push(null);
        stream
          .pipe(createGzip())
          .pipe(res)
          .on("end", () => res.end());
      });
    };
  },
});

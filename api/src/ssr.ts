import { type VercelRequest, type VercelResponse } from "@vercel/node";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";
import { createGzip } from "node:zlib";

type AppModule = typeof import("../../app/src/main_server");

const filesDir = join(process.cwd(), "files");
const indexFile = join(filesDir, "../app/build/main.html");
const appModuleFile = join(filesDir, "../app/build/main_server.js");

export async function ssr(request: VercelRequest, response: VercelResponse) {
  const indexHtml = readFileSync(indexFile, "utf-8");
  const App: AppModule = await import(appModuleFile);
  const protocol = request.headers["x-forwarded-proto"];
  const url = `${protocol}://${request.headers.host}${request.url}`;

  const {
    context,
    headers = {},
    html,
  } = await App.render(indexHtml, url, request.headers.cookie);

  Object.entries(headers).forEach(([key, value]) => {
    response.setHeader(key, value);
  });

  response
    .setHeader("Content-Encoding", "gzip")
    .setHeader("Content-type", "text/html; charset=UTF-8")
    .status(context.pageNotFound ? 404 : 200);

  if (context.static) {
    response.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
  }

  const stream = new Readable();

  stream.push(html);
  stream.push(null);
  stream
    .pipe(createGzip())
    .pipe(response)
    .on("end", () => response.end());
}

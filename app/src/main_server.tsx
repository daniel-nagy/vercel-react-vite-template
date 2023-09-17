/// <reference types="node" />
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

import { App } from "./App";
import { type Context, SSRContext } from "./SSRContext";

export async function render(
  indexHtml: string,
  _href: string,
  _cookie?: string | null
): Promise<{
  context: Context;
  headers?: Record<string, string>;
  html: string;
}> {
  const context: Context = { pageNotFound: false, static: false };

  const html = await new Promise<string>((resolve, reject) => {
    let data = "";

    const writable = new Writable({
      write(chunk, _, callback) {
        data += chunk;
        callback();
      },
    }).on("finish", () => resolve(data));

    const { pipe } = renderToPipeableStream(
      <SSRContext.Provider value={context}>
        <App />
      </SSRContext.Provider>,
      { onError: (error) => reject(error) }
    );

    pipe(writable);
  });

  const document = indexHtml.replace(/\s*<!--ssr-outlet-->\s*/, html);
  const headers = {};

  return { context, headers, html: document };
}

import { type VercelRequest, type VercelResponse } from "@vercel/node";

import { ssr } from "./ssr";

export default function main(request: VercelRequest, response: VercelResponse) {
  const protocol = request.headers["x-forwarded-proto"];
  const url = new URL(`${protocol}://${request.headers.host}${request.url}`);

  switch (url.pathname) {
    default:
      return ssr(request, response);
  }
}

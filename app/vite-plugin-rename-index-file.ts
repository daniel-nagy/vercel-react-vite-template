import { type Plugin } from "vite";

export const renameIndexFile = (name: string): Plugin => ({
  apply: "build",
  enforce: "post",
  name: "rename-index-file",
  generateBundle(_options, bundle) {
    if (bundle["index.html"]) {
      bundle["index.html"].fileName = name;
    }
  },
});

import { createContext } from "react";

export type Context = {
  pageNotFound: boolean;
  static: boolean;
};

export const SSRContext = createContext<Context>({
  pageNotFound: false,
  static: false,
});

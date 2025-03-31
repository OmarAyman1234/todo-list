import { createContext } from "react";

export const UrlsContext = createContext();

export function UrlsProvider({ children }) {
  const serverUrl = "https://todo-omar-ay.koyeb.app/";
  // const serverUrl = 'http://localhost:4444';

  const apiBase = "https://todo-omar-ay.koyeb.app/api";
  // const apiBase = 'http://localhost:4444/api';

  const value = {
    serverUrl,
    apiBase,
  };

  return <UrlsContext.Provider value={value}>{children}</UrlsContext.Provider>;
}

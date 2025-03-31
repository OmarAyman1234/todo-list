import { createContext } from "react";

export const UrlsContext = createContext();

export function UrlsProvider({ children }) {
  const serverUrl = "https://todo-omar-ay.koyeb.app";
  // const serverUrl = "http://localhost:4444";

  const apiBase = "https://todo-omar-ay.koyeb.app/api";
  // const apiBase = "http://localhost:4444/api";

  async function fetchWithAuth(url, options = {}, auth) {
    const { accessToken, setAccessToken } = auth;

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    };

    let res = await fetch(url, config);

    if (res.status === 403) {
      // Try refreshing the accessToken
      const refreshResponse = await fetch(serverUrl + "/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.status === 401) {
        // Refresh token expired, login is needed.
        return refreshResponse;
      }

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken = data.accessToken;
        // Retry original request
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        res = await fetch(url, config);

        setAccessToken(newAccessToken);
        // res.newAccessToken = newAccessToken;
      }
    }
    return res;
  }

  const value = {
    serverUrl,
    apiBase,
    fetchWithAuth,
  };

  return <UrlsContext.Provider value={value}>{children}</UrlsContext.Provider>;
}

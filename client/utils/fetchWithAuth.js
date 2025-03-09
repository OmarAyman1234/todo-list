async function fetchWithAuth(url, options = {}, auth) {
  const serverURL = "https://todo-omar-ay.koyeb.app";
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
    const refreshResponse = await fetch(serverURL + "/refresh", {
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

export default fetchWithAuth;

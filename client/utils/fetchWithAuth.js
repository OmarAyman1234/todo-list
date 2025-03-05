async function fetchWithAuth(url, options = {}, accessToken) {
  const serverURL = "http://localhost:4444";

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  };

  console.log(accessToken);
  let res = await fetch(url, config);
  console.log(res);

  if (res.status === 403) {
    console.log("Reached 403 fetchWithAuth");
    // Try refreshing the accessToken
    const refreshResponse = await fetch(serverURL + "/refresh", {
      method: "POST",
      credentials: "include",
    });

    console.log(refreshResponse);
    if (refreshResponse.status === 401) {
      // Refresh token expired, login is needed.
      return refreshResponse;
    }

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const newAccessToken = data.accessToken;
      console.log("new at fetchWithAuth\n " + newAccessToken);
      // Retry original request
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      res = await fetch(url, config);
      res.newAccessToken = newAccessToken;
    }
    console.log(res);
  }
  return res;
}

export default fetchWithAuth;

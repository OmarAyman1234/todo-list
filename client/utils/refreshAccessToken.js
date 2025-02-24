async function refreshAccessToken(serverUrl, onUnauthorized) {
  try {
    const res = await fetch(serverUrl + "/refresh", {
      method: "POST",
      credentials: "include",
    });

    // refresh route responded with 401 means refreshToken (cookie) expired.
    if (res.status === 401) {
      onUnauthorized();
      return null;
    }

    const data = await res.json();

    return data.accessToken; // Return the newly created accessToken.
  } catch (err) {
    console.log(err);
  }
}

export default refreshAccessToken;

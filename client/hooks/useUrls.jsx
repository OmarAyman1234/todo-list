import { useContext } from "react";
import { UrlsContext } from "../context/UrlsContext";

function useUrls() {
  const context = useContext(UrlsContext);

  if (!context) throw new Error("Urls context was not provided.");

  return context;
}

export default useUrls;

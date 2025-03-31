const { useContext } = require("react");
const { UrlsContext } = require("../context/UrlsContext");

function useUrls() {
  const context = useContext(UrlsContext);

  if (!context) throw new error("Urls context was not provided.");

  return context;
}

export default useUrls;

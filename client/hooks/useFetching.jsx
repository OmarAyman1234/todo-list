import { useContext } from "react";
import { fetchingContext } from "../context/FetchingContext";

function useFetching() {
  const context = useContext(fetchingContext);

  if (!context) throw new Error("fetching context error");

  return context;
}
export default useFetching;

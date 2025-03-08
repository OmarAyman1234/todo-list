// This component should act as an overlay when fetching data.

import { createContext, useState } from "react";

export const fetchingContext = createContext();

export function FetchingProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const value = { isFetching, setIsFetching };
  return (
    <fetchingContext.Provider value={value}>
      {children}
    </fetchingContext.Provider>
  );
}


import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

const LeadsFilterCtx = createContext();

export const LeadsFilterProvider = ({ children }) => {
  const [sp] = useSearchParams();

  // pull values directly from the URL
  const filters = {
    search:   sp.get("q")       || "",
    city:     sp.get("location")|| "",
    intent:   sp.get("intent")  || "",
  };

  return (
    <LeadsFilterCtx.Provider value={filters}>
      {children}
    </LeadsFilterCtx.Provider>
  );
};

export const useLeadsFilter = () => useContext(LeadsFilterCtx);

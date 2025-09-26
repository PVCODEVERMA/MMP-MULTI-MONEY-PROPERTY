import { createContext, useContext, useState } from "react";

const LeadsCtx = createContext();
export const useLeadsCtx = () => useContext(LeadsCtx);

export default function LeadsProvider({ children }) {
  const [hasPaid, setHasPaid] = useState(false);
  return (
    <LeadsCtx.Provider value={{ hasPaid, setHasPaid }}>
      {children}
    </LeadsCtx.Provider>
  );
}

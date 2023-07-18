import React, { createContext, useContext, useState } from "react";

const CryptoContext = createContext();

export const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const symbol = currency === "USD" ? "$" : "₹";

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoState = () => useContext(CryptoContext);

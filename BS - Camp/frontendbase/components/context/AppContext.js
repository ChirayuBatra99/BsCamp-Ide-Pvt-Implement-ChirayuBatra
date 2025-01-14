import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState("01");

  return (
    <AppContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </AppContext.Provider>
  );
};

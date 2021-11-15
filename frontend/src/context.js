import React, { useState, useEffect, createContext, useContext } from "react";
const AppContext = createContext();

const Context = ({ children }) => {
  return (
    <AppContext.Provider value={{ value: "hello world" }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default Context;
export { useGlobalContext };

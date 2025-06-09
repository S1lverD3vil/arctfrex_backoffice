"use client";

import { createContext, useContext } from "react";
import { initialAppState, useApp } from "./useApp";

type ReturnUseApp = ReturnType<typeof useApp>;

const AppContext = createContext<ReturnUseApp>(initialAppState);

export const AppContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const value = useApp();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};

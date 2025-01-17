"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useReducer } from "react";

const initialAppShellState = {
  title: "",
  pathname: "",
  searchParams: {} as Record<string, string>,
  params: {} as Record<string, string>,
  activeMenu: {},
  setActiveMenu: () => {},
  setAppBarTitle: () => {},
};

enum AppShellActionKeys {
  SET_TITLE = "SET_TITLE",
  SET_ACTIVE_MENU = "SET_ACTIVE_MENU",
}

type AppShellState = typeof initialAppShellState;
type AppShellAction = { type: AppShellActionKeys; payload: string };

const useAppShellReducer = (state: AppShellState, action: AppShellAction) => {
  switch (action.type) {
    case AppShellActionKeys.SET_TITLE:
      return { ...state, title: action.payload };
    case AppShellActionKeys.SET_ACTIVE_MENU:
      return { ...state, activeMenu: action.payload };
    default:
      return state;
  }
};

const useAppShell = (initialState: AppShellState) => {
  const [state, dispatch] = useReducer(useAppShellReducer, initialState);
  const pathname = usePathname();

  const setAppBarTitle = (title: string) => {
    dispatch({ type: AppShellActionKeys.SET_TITLE, payload: title });
  };

  const setActiveMenu = (activeMenu: any) => {
    dispatch({ type: AppShellActionKeys.SET_ACTIVE_MENU, payload: activeMenu });
  };

  return { ...state, pathname, setAppBarTitle, setActiveMenu };
};

type ReturnUseAppShell = ReturnType<typeof useAppShell>;

const AppShellContext = createContext<ReturnUseAppShell>(initialAppShellState);

export const AppShellContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const value = useAppShell(initialAppShellState);

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
};

export const useAppShellContext = () => {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error(
      "useAppShellContext must be used within a AppShellContextProvider"
    );
  }

  return context;
};

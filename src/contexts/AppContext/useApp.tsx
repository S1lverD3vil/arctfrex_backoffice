"use client";

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { GROUP_ROLES } from "@/constants/roles";
import {
  LOCAL_STORAGE_KEYS,
  clearLocalStorage,
  getLocalStorage,
} from "@/utils/local-storage";

export const initialAppState = {
  userSession: {
    userid: "",
    name: "",
    email: "",
    access_token: "",
    expiration: 0,
    role_id: "",
    referral_code: "",
  },
  setUserSession: () => {},
  clearUserSession: () => {},
};

enum AppActions {
  SET_USER = "SET_USER",
}

export type AppState = typeof initialAppState;
type UserSession = AppState["userSession"];
type Action = {
  payload: UserSession;
  type: string;
};

const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case AppActions.SET_USER:
      return { ...state, userSession: action.payload };
    default:
      return state;
  }
};

export const useApp = () => {
  const [{ userSession }, dispatch] = useReducer(appReducer, initialAppState);
  const router = useRouter();

  const setUserSession = (newUser: UserSession) => {
    dispatch({ type: AppActions.SET_USER, payload: newUser });
  };

  const clearUserSession = () => {
    dispatch({
      type: AppActions.SET_USER,
      payload: initialAppState.userSession,
    });
    clearLocalStorage();
    router.push("/");
  };

  useEffect(() => {
    const userSession = getLocalStorage<UserSession>(
      LOCAL_STORAGE_KEYS.SESSION
    );

    if (userSession) {
      setUserSession(userSession);
    }
  }, []);

  return {
    userSession,
    setUserSession,
    clearUserSession,
  };
};

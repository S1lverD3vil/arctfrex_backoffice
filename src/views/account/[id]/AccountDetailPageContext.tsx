"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialAccountDetailPageState = {
  userid: "",
  accountid: "",
  setUserid: () => {},
  setAccountid: () => {},
};

enum ActionDetailPageActions {
  SET_USERID = "SET_USERID",
  SET_ACCOUNTID = "SET_ACCOUNTID",
}

type AccountDetailPageState = typeof initialAccountDetailPageState;
type UserSession =
  | AccountDetailPageState["userid"]
  | AccountDetailPageState["accountid"];
type AccountDetailPageAction = {
  payload: UserSession;
  type: string;
};

const useAccountDetailPageReducer = (
  state: AccountDetailPageState,
  action: AccountDetailPageAction
) => {
  switch (action.type) {
    case ActionDetailPageActions.SET_USERID:
      return { ...state, userid: action.payload };

    case ActionDetailPageActions.SET_ACCOUNTID:
      return { ...state, accountid: action.payload };
    default:
      return state;
  }
};

const useAccountDetailReducer = (initialState: AccountDetailPageState) => {
  const [{ accountid, userid }, dispatch] = useReducer(
    useAccountDetailPageReducer,
    initialState
  );

  const searchParams = useSearchParams();
  const _accountid = searchParams?.get("accountid");

  const setUserid = (userid: string) => {
    dispatch({ type: ActionDetailPageActions.SET_USERID, payload: userid });
  };

  const setAccountid = (accountid: string) => {
    dispatch({
      type: ActionDetailPageActions.SET_ACCOUNTID,
      payload: accountid,
    });
  };

  useEffect(() => {
    if (_accountid) {
      setAccountid(_accountid);
    }
  }, [_accountid]);

  return {
    accountid,
    userid,
    setUserid,
    setAccountid,
  };
};

type ReturnUseAccountDetail = ReturnType<typeof useAccountDetailReducer>;

const AccountDetailPageContext = createContext<ReturnUseAccountDetail>(
  initialAccountDetailPageState
);

export const AccountDetailPageContextProvider = (
  props: React.PropsWithChildren
) => {
  const { children } = props;
  const value = useAccountDetailReducer(initialAccountDetailPageState);

  return (
    <AccountDetailPageContext.Provider value={value}>
      {children}
    </AccountDetailPageContext.Provider>
  );
};

export const useAccountDetailPageContext = () => {
  const context = useContext(AccountDetailPageContext);

  if (!context) {
    throw new Error(
      "useAccountDetailPageContext must be used within a AccountDetailPageContextProvider"
    );
  }

  return context;
};

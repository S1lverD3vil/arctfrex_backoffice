"use client";

import { useParams, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialDepositDetailPageState = {
  depositid: "",
  setUserid: () => {},
  setDepositid: () => {},
};

enum ActionDetailPageActions {
  SET_DEPOSITID = "SET_DEPOSITID",
}

type DepositDetailPageState = typeof initialDepositDetailPageState;
type UserSession = DepositDetailPageState["depositid"];
type DepositDetailPageAction = {
  payload: UserSession;
  type: string;
};

const useDepositDetailPageReducer = (
  state: DepositDetailPageState,
  action: DepositDetailPageAction
) => {
  switch (action.type) {
    case ActionDetailPageActions.SET_DEPOSITID:
      return { ...state, depositid: action.payload };
    default:
      return state;
  }
};

const useDepositDetailReducer = (initialState: DepositDetailPageState) => {
  const [{ depositid }, dispatch] = useReducer(
    useDepositDetailPageReducer,
    initialState
  );

  const params = useParams<{ depositid: string }>();
  const _depositid = params?.depositid;

  const setDepositid = (depositid: string) => {
    dispatch({
      type: ActionDetailPageActions.SET_DEPOSITID,
      payload: depositid,
    });
  };

  useEffect(() => {
    if (_depositid) {
      setDepositid(_depositid);
    }
  }, [_depositid]);

  return {
    depositid,
    setDepositid,
  };
};

type ReturnUseDepositDetail = ReturnType<typeof useDepositDetailReducer>;

const DepositDetailPageContext = createContext<ReturnUseDepositDetail>(
  initialDepositDetailPageState
);

export const DepositDetailPageContextProvider = (
  props: React.PropsWithChildren
) => {
  const { children } = props;
  const value = useDepositDetailReducer(initialDepositDetailPageState);

  return (
    <DepositDetailPageContext.Provider value={value}>
      {children}
    </DepositDetailPageContext.Provider>
  );
};

export const useDepositDetailPageContext = () => {
  const context = useContext(DepositDetailPageContext);

  if (!context) {
    throw new Error(
      "useDepositDetailPageContext must be used within a DepositDetailPageContextProvider"
    );
  }

  return context;
};

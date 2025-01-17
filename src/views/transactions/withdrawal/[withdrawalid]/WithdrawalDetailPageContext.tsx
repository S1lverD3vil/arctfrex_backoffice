"use client";

import { useParams, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialWithdrawalDetailPageState = {
  withdrawalid: "",
  setUserid: () => {},
  setWithdrawalid: () => {},
};

enum ActionDetailPageActions {
  SET_WITHDRAWALID = "SET_WITHDRAWALID",
}

type WithdrawalDetailPageState = typeof initialWithdrawalDetailPageState;
type UserSession = WithdrawalDetailPageState["withdrawalid"];
type WithdrawalDetailPageAction = {
  payload: UserSession;
  type: string;
};

const useWithdrawalDetailPageReducer = (
  state: WithdrawalDetailPageState,
  action: WithdrawalDetailPageAction
) => {
  switch (action.type) {
    case ActionDetailPageActions.SET_WITHDRAWALID:
      return { ...state, withdrawalid: action.payload };
    default:
      return state;
  }
};

const useWithdrawalDetailReducer = (
  initialState: WithdrawalDetailPageState
) => {
  const [{ withdrawalid }, dispatch] = useReducer(
    useWithdrawalDetailPageReducer,
    initialState
  );

  const params = useParams<{ withdrawalid: string }>();
  const _withdrawalid = params?.withdrawalid;

  const setWithdrawalid = (withdrawalid: string) => {
    dispatch({
      type: ActionDetailPageActions.SET_WITHDRAWALID,
      payload: withdrawalid,
    });
  };

  useEffect(() => {
    if (_withdrawalid) {
      setWithdrawalid(_withdrawalid);
    }
  }, [_withdrawalid]);

  return {
    withdrawalid,
    setWithdrawalid,
  };
};

type ReturnUseWithdrawalDetail = ReturnType<typeof useWithdrawalDetailReducer>;

const WithdrawalDetailPageContext = createContext<ReturnUseWithdrawalDetail>(
  initialWithdrawalDetailPageState
);

export const WithdrawalDetailPageContextProvider = (
  props: React.PropsWithChildren
) => {
  const { children } = props;
  const value = useWithdrawalDetailReducer(initialWithdrawalDetailPageState);

  return (
    <WithdrawalDetailPageContext.Provider value={value}>
      {children}
    </WithdrawalDetailPageContext.Provider>
  );
};

export const useWithdrawalDetailPageContext = () => {
  const context = useContext(WithdrawalDetailPageContext);

  if (!context) {
    throw new Error(
      "useWithdrawalDetailPageContext must be used within a WithdrawalDetailPageContextProvider"
    );
  }

  return context;
};

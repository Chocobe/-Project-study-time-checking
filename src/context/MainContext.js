import React, {
  useReducer,
  useCallback,
} from "react";

import { commonApi } from "@/api"

const LOCAL_STORAGE_KEY = "study-with-ai";

/**
 * @param {{
 *  email: string;
 *  password: string;
 *  token: string;
 * }} payload
 */
const setLocalStorage = payload => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
};

const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

// FIXME: types 파일로 분리하기
/** 
 * @type { import("react").Reducer<{
 *  email: string;
 *  password: string;
 * }, {
 *  type: "INIT" | "LOGIN" | "LOGOUT";
 *  payload: {
 *    email: string;
 *    password: string;
 *  }
 * }> }
 */
const mainReducer = (prevState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT": {
      // localStorage 에서 email 가져오기
      const storageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      return {
        email: storageData?.email,
        password: storageData?.password,
        token: storageData?.token,
      };
    }
    
    case "LOGIN": {
      // OAuth2 Google Flow 에 따라 변경 예정
      setLocalStorage(payload);

      return {
        ...prevState,
        ...payload,
      };
    }

    case "LOGOUT": {
      // FIXME: API call 하기
      clearLocalStorage();

      console.log("로그아웃 완료");
      console.log(localStorage.getItem(LOCAL_STORAGE_KEY));

      return {
        email: undefined,
        password: undefined,
        token: undefined,
      };
    }

    default: {
      throw new Error(`[mainReducer] - "${type} 은(는) 사용할 수 없는 type 입니다.`);
    }
  }
};

// FIXME: types 파일로 분리하기
/** @type { React.Context<{ email: string; password: string; token: string; }> } */
export const MainStateContext = React.createContext();

// FIXME: types 파일로 분리하기
// /**
//  * @type { React.Context<(
//  *  (params: {
//  *    type: "INIT" | "LOGIN" | "LOGOUT";
//  *    payload: {
//  *      email: string;
//  *      password: string;
//  *    };
//   * }) => void
//  * )>}
//  */
/**
 * @type { React.Context<{ 
 *  login: (email: string, password: string) 
 *    => import("axios").AxiosResponse<{ email: string; password: string; token: string; }>;
 *  logout: () => void;
 *  init: () => void;
 * }> }
 */
export const MainDispatchContext = React.createContext();

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    email: undefined,
    password: undefined,
    token: undefined,
  });

  const asyncDispatch = {
    init: useCallback(() => dispatch({ type: "INIT" }), []),
    // login: useCallback(async (email, password) => {
    login: useCallback(async (email, password) => {
      try {
        const { data: { params: payload } } = await commonApi.login(email, password);

        dispatch({ type: "LOGIN", payload });

        return payload;
        
        // commonApi.login(email, password).then(response => {
        //     console.log("async login() 완료")
        //     console.log("response");
        //     console.log(response.data.params);

        //     dispatch({ type: "LOGIN", payload: { ...response.data.params } });
        // });
      } catch (e) {
        console.warn("[MainContext - 로그인 실패]: ");
        console.warn(e);
      }
    }, []),

    logout: useCallback(() => {
      dispatch({ type: "LOGOUT" });
    }, []),
  };

  return (
    <MainStateContext.Provider value={state}>
      <MainDispatchContext.Provider value={asyncDispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainStateContext.Provider>
  );
};

export default React.memo(MainContext);
import React, {
  useReducer,
  useEffect,
} from "react";

import { mainReducer } from "./mainReducer";

// FIXME: types 파일로 분리하기
/** @type { React.Context<{ email: string; password: string; token: string; }> } */
export const MainStateContext = React.createContext();

// FIXME: types 파일로 분리하기
/**
 * @type { React.Context<{ 
 *  init: () => void;
 *  login: (email: string, password: string) 
 *    => import("axios").AxiosResponse<{ email: string; password: string; token: string; }>;
 * }> }
 */
export const MainDispatchContext = React.createContext();

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    email: undefined,
    password: undefined,
    token: undefined,
  });

  // const init = useCallback(() => {
  //   dispatch({ type: "INIT" });
  // }, []);

  // const login = useCallback(userInfo => {
  //   console.log("MainContext - login() 호출");
  //   console.log(userInfo);
  // }, []);

  // const openLoginForm = useCallback(() => {
  //   window.open(process.env.REACT_APP_LOGIN_URL_GOOGLE, "_black");
  // }, []);

  // const async = useMemo(() => ({
  //   init,
  //   login,
  // }), [init, login]);

  // const _asyncDispatch = {
  //   init: useCallback(() => dispatch({ type: "INIT" }), []),
  //   login: useCallback(async (email, password) => {
  //     try {
  //       const { data: { params: payload } } = await commonApi.login(email, password);

  //       dispatch({ type: "LOGIN", payload });

  //       return payload;
        
  //       // commonApi.login(email, password).then(response => {
  //       //     console.log("async login() 완료")
  //       //     console.log("response");
  //       //     console.log(response.data.params);

  //       //     dispatch({ type: "LOGIN", payload: { ...response.data.params } });
  //       // });
  //     } catch (e) {
  //       console.warn("[MainContext - 로그인 실패]: ");
  //       console.warn(e);
  //     }
  //   }, []),

  //   logout: useCallback(() => {
  //     dispatch({ type: "LOGOUT" });
  //   }, []),
  // };

  return (
    <MainStateContext.Provider value={state}>
      <MainDispatchContext.Provider value={dispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainStateContext.Provider>
  );
};

export default React.memo(MainContext);
import React, {
  useReducer,
} from "react";

import { mainReducer } from "./mainReducer";

// FIXME: types 파일로 분리하기
/** @type { React.Context<{ email: string; password: string; token: string; }> } */
export const MainStateContext = React.createContext();

// FIXME: types 파일로 분리하기
/**
 * @type { React.Context<{ 
 *  init: () => void;
 *  login: (token: string) => import("axios").AxiosResponse<
 *    { email: string; password: string; token: string; }
 *  >;
 *  logout: () => void;
 * }> }
 */
export const MainDispatchContext = React.createContext();

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    token: undefined,
  });

  return (
    <MainStateContext.Provider value={state}>
      <MainDispatchContext.Provider value={dispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainStateContext.Provider>
  );
};

export default React.memo(MainContext);
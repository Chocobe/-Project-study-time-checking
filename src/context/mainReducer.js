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

export const DISPATCH_TYPE = {
  INIT: "init",
  LOGIN: "login",
};

// FIXME: types 파일로 분리하기
/** 
 * @type { import("react").Reducer<{
 *  email: string;
 *  password: string;
 * }, {
 *  type: "INIT" | "LOGIN";
 *  payload: {
 *    email: string;
 *    password: string;
 *  }
 * }> }
 */
export const mainReducer = (_prevState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DISPATCH_TYPE.INIT: {
      // localStorage 에서 email 가져오기
      const storageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      return {
        token: storageData?.token,
      };
    }
    
    case DISPATCH_TYPE.LOGIN: {
      // OAuth2 Google Flow 에 따라 변경 예정
      console.log("MainDispatchContext - LOGIN")
      console.log(payload);
      
      setLocalStorage(payload);

      return {
        ...payload,
      };
    }

    default: {
      throw new Error(`[mainReducer] - "${type} 은(는) 사용할 수 없는 type 입니다.`);
    }
  }
};
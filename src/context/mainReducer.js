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
  LOGOUT: "logout",
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
export const mainReducer = (prevState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DISPATCH_TYPE.INIT: {
      const storageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      return { ...storageData };
    }
    
    case DISPATCH_TYPE.LOGIN: {
      setLocalStorage(payload);
      return { ...payload };
    }

    case DISPATCH_TYPE.LOGOUT: {
      clearLocalStorage()
      return Object.entries(prevState)
        .reduce((state, [key]) => ({
          ...state,
          [key]: undefined 
        }), {});
    }

    default: {
      throw new Error(`[mainReducer] - "${type} 은(는) 사용할 수 없는 type 입니다.`);
    }
  }
};
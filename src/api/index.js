import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 2000,

  // FIXME: BE 연결 시, true 로 바꾸기
  withCredentials: false,
};

export const createAxiosInstance = (config, useToken = false) => {
  const instance = axios.create({
    ...config,
    
    // baseURL: process.env.REACT_APP_END_POINT,
    // timeout: 2000,

    // FIXME: BE 연결 시, true 로 바꾸기
    withCredentials: true,
  });

  instance.interceptors.request.use(
    config => {
      const lsData = JSON.parse(localStorage.getItem("study-with-ai") ?? {});
      const token = lsData?.token;

      console.log("interceptors 에서 token 확인");
      console.log(token);

      if (!useToken) return config;

      config.headers = {
        common: {
          Authorization: `Bearer ${token}`,
        },
      };

      return config;
    },

    error => {
      return Promise.reject(error);
    }
  )

  return instance;
}

// export const api = createAxiosInstance(config);

// export const commonApi__ = {
//   /**
//    * @param { string } email
//    * @param { string } password
//    */
//   async login(email, password) {
//     // FIXME: BE 연결 시, URL 바꾸기
//     return await publicApi.post("/posts", { params: {
//       email,
//       password,
//       // FIXME: BE 연결 시, token params 지우기
//       token: process.env.NODE_ENV === "development" 
//         ? "jwt token for development"
//         : "jwt token for production"
//     }});
//   },
// };

export const tokenApi = createAxiosInstance(config, true);

// export const privateApi__ = {
//   async hello() {
//     return await api.get("/hello", { params: {
//       param1: "인자 1",
//       param2: "인자 2",
//     }});
//   },
// };
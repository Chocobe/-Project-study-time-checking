import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 2000,

  // FIXME: BE 연결 시, true 로 바꾸기
  withCredentials: false,
};

const createAxiosInstance = config => {
  const instance = axios.create({
    ...config,
    
    // baseURL: process.env.REACT_APP_END_POINT,
    // timeout: 2000,

    // FIXME: BE 연결 시, true 로 바꾸기
    // withCredentials: false,
  });

  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token")

      config.headers = {
        common: {
          Authorization: token,
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

const api = createAxiosInstance(config);
const publicApi = axios.create(config);

export const commonApi = {
  /**
   * @param { string } email
   * @param { string } password
   */
  async login(email, password) {
    // FIXME: BE 연결 시, URL 바꾸기
    return await publicApi.post("/posts", { params: {
      email,
      password,
      // FIXME: BE 연결 시, token params 지우기
      token: process.env.NODE_ENV === "development" 
        ? "jwt token for development"
        : undefined,
    }});
  },
};

const privateApi = {
  async hello() {
    return await api.get("/hello", { params: {
      param1: "인자 1",
      param2: "인자 2",
    }});
  },
};

export default privateApi;
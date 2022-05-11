import React, {
  useState,
} from "react";

import api, {
  commonApi,
} from "@/api";

import "./AuthorLayout.scss";

const AuthorLayout = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const onChangeUserInfo = ({ target }) => {
    const { id, value } = target;

    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  };

  const login = async () => {
    try {
      const { email, password } = userInfo;

      const { data } = await commonApi.login(email, password);
      const {
        params: {
          email: user,
          token,
        },
      } = data;

      localStorage.setItem("token", token + ` ${user}`)
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch({ message }) {
      console.error(`[로그인 실패]: ${message}`);
    }
  };

  const onClickTokenTest = () => {
    try {
      api.hello();
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="authorLayout">
      {/* 로그인 Child Route */}
      <main className="authorLayout-main">
        <h1 className="authorLayout-main-title">
          로그인 {process.env.REACT_APP_MY_VAR}
        </h1>

        <div className="authorLayout-main-form">
          {/* Email */}
          <div className="authorLayout-main-form-inputWrapper">
            <label 
              htmlFor="email"
              className="authorLayout-main-form-inputWrapper-label"
            >
              Email:
            </label>

            {/* TODO: 버튼 컴포넌트 만들기 */}
            <input 
              id="email" 
              type="email" 
              className="authorLayout-main-form-inputWrapper-input"
              value={userInfo.email}
              onChange={onChangeUserInfo}
            />
          </div>

          {/* Password */}
          <div className="authorLayout-main-form-inputWrapper">
            <label
              htmlFor="password"
              className="authorLayout-main-form-inputWrapper-label"
            >
              Password:
            </label>

            <input
              id="password"
              type="password"
              className="authorLayout-main-form-inputWrapper-input"
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </div>

          <div className="authorLayout-main-form-actionWrapper">
            <button
              className="authorLayout-main-form-actionWrapper-button"
              onClick={login}
            >
              로그인
            </button>

            <button
              className="authorLayout-main-form-actionWrapper-button"
              onClick={onClickTokenTest}
            >
              API Token 테스트
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorLayout;
import React, {
  useMemo,
  useCallback,
  useContext,
} from "react";
import { 
  useNavigate,
  Outlet,
} from "react-router-dom";

import {
  MainStateContext,
  MainDispatchContext,
} from "@/context/MainContext";
import ChocobeButton from "@/components/Button/ChocobeButton";

import "./MainLayout.scss";

const MainLayout = () => {
  const state = useContext(MainStateContext);
  const dispatch = useContext(MainDispatchContext);
  const navigator = useNavigate();

  const hasLogin = useMemo(() => {
    const { email, password, token } = state;

    return email && password && token;
  }, [state]);

  const authButtonName = useMemo(() => {
    return hasLogin ? "로그아웃" : "로그인";
  }, [hasLogin]);

  const login = useCallback(async () => {
    await dispatch.login("초코비 이메일 👍", "초코비 비번 🎈");

    navigator("/study");
  }, [dispatch, navigator]);

  const logout = useCallback(() => {
    dispatch.logout();
    navigator("/");
  }, [dispatch, navigator]);

  const onClickAuthButton = useCallback(() => {
    // FIXME: 임시 로직
    // FIXME: FIXME: Google OAuth 연결 시, 로직 바꾸기

    hasLogin
      ? logout()
      : login();
  }, [hasLogin, login, logout]);

  return (
    <div className="MainLayout">
      <div className="MainLayout-inner">
        <header className="MainLayout-inner-header">
          <h1 className="MainLayout-inner-header-title">
            Study Time Checker
          </h1>

          <p className="MainLayout-inner-header-description">
            AI 와 함께 순수 공부시간을 측정해 보세요
          </p>
        </header>

        <div className="MainLayout-inner-actions">
          <div className="MainLayout-inner-actions-decorator" />

          <ChocobeButton
            className="MainLayout-inner-actions-button"
            onClick={onClickAuthButton}
          >
            {authButtonName}
          </ChocobeButton>

          {/* FIXME: OAuth2 Google 로그인 */}
          <a href={process.env.REACT_APP_LOGIN_GOOGLE_URL} target="_black">로그인 테스트</a>
        </div>

        <main className="MainLayout-inner-main">
          <div className="MainLayout-inner-main-intro">
            <ul className="MainLayout-inner-main-intro-list">
              <li className="MainLayout-inner-main-intro-list-item">
                캠을 통해 AI 가 순수 공부시간을 측정해 줍니다.
              </li>

              <li className="MainLayout-inner-main-intro-list-item">
                AI 가 측정하는 시간은 3가지 형태로 측정합니다.
              </li>
            </ul>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
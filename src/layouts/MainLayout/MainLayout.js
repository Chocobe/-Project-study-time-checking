import React, {
  useMemo,
  useCallback,
  useContext,
  useEffect,
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
import { DISPATCH_TYPE } from "@/context/mainReducer";

const MainLayout = () => {
  const state = useContext(MainStateContext);
  const dispatch = useContext(MainDispatchContext);
  const navigator = useNavigate();

  useEffect(() => {
    dispatch({ type: DISPATCH_TYPE.INIT });
  }, [dispatch]);
  
  useEffect(() => {
    if (state?.token) navigator("/study");
  }, [state, navigator]);
  
  const hasLogin = useMemo(() => {
    return !!state?.token;
  }, [state]);

  const authButtonName = useMemo(() => {
    return hasLogin ? "로그아웃" : "로그인";
  }, [hasLogin]);

  const login = useCallback(() => {
    const loginWindow = window.open(process.env.REACT_APP_LOGIN_URL_GOOGLE);

    loginWindow.addEventListener("unload", () => {
      dispatch({ type: DISPATCH_TYPE.INIT });
    })
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: DISPATCH_TYPE.LOGOUT });
    navigator("/");
  }, [dispatch, navigator]);

  const onClickAuthButton = useCallback(() => {
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
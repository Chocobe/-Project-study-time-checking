import React, {
  useState,
  useCallback,
} from "react";
import { Outlet } from "react-router-dom";

import ChocobeButton from "@/components/ChocobeButton/ChocobeButton";

import "./MainLayout.scss";

const MainLayout = () => {
  // TODO: useCOntext() 필요
  
  const [buttonName] = useState("로그인");

  const onClick = useCallback(() => console.log("로그인 버튼 클릭"), []);
  
  return (
    <div className="MainLayout">
      <header className="MainLayout-header">
        <h1 className="MainLayout-header-title">
          Study Time Checker
        </h1>

        <p className="MainLayout-header-description">
          AI 와 함께 순수 공부시간을 측정해 보세요
        </p>
      </header>

      <div className="MainLayout-actions">
        <div className="MainLayout-actions-decorator" />

        <ChocobeButton
          onClick={onClick}
          className="MainLayout-actions-button"
          // fluid
        >
          {buttonName}
        </ChocobeButton>
      </div>

      <main className="MainLayout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
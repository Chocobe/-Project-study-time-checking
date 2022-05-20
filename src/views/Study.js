import React, {
  useContext,
} from "react";

import {
  MainStateContext,
} from "@/context/MainContext";

const Study = () => {
  const state = useContext(MainStateContext);
  
  return (
    <div>
      <h1>Study Page</h1>

      <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ff1493",
      }}>
        <h1>로그인 완료</h1>
        <h1>Email: {state.email}</h1>
        <h1>Password: {state.password}</h1>
        <h1>Token: {state.token}</h1>
      </div>
    </div>
  );
};

export default React.memo(Study);
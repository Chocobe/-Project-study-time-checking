import React, {
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  MainStateContext,
  MainDispatchContext,
} from "@/context/MainContext"

const Home = () => {
  const state = useContext(MainStateContext);
  const dispatch = useContext(MainDispatchContext);
  const navigator = useNavigate();

  useEffect(() => {
    dispatch.init();
    const { email, password, token } = state;

    if (email && password && token) {
      navigator("/study");
    }
  }, []);
  
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default React.memo(Home);
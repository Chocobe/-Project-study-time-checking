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

import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";

import "./Home.scss";

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
  }, [dispatch, state, navigator]);
  
  return (
    <div className="Home">
      <div className="Home-description">
        {
          Object.values(itemTypes).map(type => (
            <div className="Home-description-item" key={type}>
              <ChocobeRecorderCategory type={type} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default React.memo(Home);
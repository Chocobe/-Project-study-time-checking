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

import { DISPATCH_TYPE } from "@/context/mainReducer";

import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";

import "./Home.scss";

const Home = () => {
  const state = useContext(MainStateContext);
  const dispatch = useContext(MainDispatchContext);
  const navigator = useNavigate();

  useEffect(() => {
    dispatch({ type: DISPATCH_TYPE.INIT });
    const { email, password, token } = state;

    console.log("Home");
    console.log([email, password, token]);

    if (email && password && token) {
      navigator("/study");
    }
    // eslint-disable-next-line
  }, []);
  
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
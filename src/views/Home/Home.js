import React, {
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  MainStateContext,
} from "@/context/MainContext"


import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";

import "./Home.scss";

const Home = () => {
  const state = useContext(MainStateContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (state?.token) navigator("/study");
  }, [state, navigator]);

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
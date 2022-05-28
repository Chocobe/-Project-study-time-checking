import React, {
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  MainStateContext,
} from "@/context/MainContext/MainContext"


import { itemTypes } from "@/components/RecordCategory/model";
import ChocobeRecordCategory from "@/components/RecordCategory/ChocobeRecordCategory";

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
              <ChocobeRecordCategory type={type} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default React.memo(Home);
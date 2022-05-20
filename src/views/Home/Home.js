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

import ChocobeLabeledImage from "@/components/LabeledImage/ChocobeLabeledImage";
import { descriptionItems } from "./descriptionItems";

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
  }, []);
  
  return (
    <div className="Home">
      {/* <ul className="Home-introduce">
        <li className="Home-introduce-item">
          캠을 통해 AI 가 순수 공부시간을 측정해 줍니다.
        </li>

        <li className="Home-introduce-item">
          AI 가 측정하는 시간은 3가지 형태로 측정합니다.
        </li>
      </ul> */}

      <div className="Home-description">
        {
          descriptionItems.map(item =>
            <div className="Home-description-item" key={item.fileName}>
              <ChocobeLabeledImage {...item}>
                {item.label}
              </ChocobeLabeledImage>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default React.memo(Home);
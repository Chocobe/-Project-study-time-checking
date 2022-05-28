import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import {
  RecorderStateContext,
} from "@/context/RecorderContext/RecorderContext";

import ChocobeRecordCategory from "@/components/RecordCategory/ChocobeRecordCategory";
import { itemTypes } from "@/components/RecordCategory/model";

import "./ChocobeRecorder.scss";

const ChocobeRecorder = props => {
  const state = useContext(RecorderStateContext);

  console.log(state);

  // FIXME: Mocking
  const [mockSrc, setMockSrc] = useState();
  const initMockSrc = useCallback(async () => {
    const { default: loadedImg } = await import("@/assets/imgs/camMockImg.png");
    setMockSrc(loadedImg);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      initMockSrc();
    });
  }, [initMockSrc]);
  // FIXME: Mocking

  return (
    <div className="ChocobeRecorder">
      <figure className="ChocobeRecorder-camWrapper">
        <img
          className="ChocobeRecorder-camWrapper-cam"
          src={mockSrc}
          alt="캠 영상"
        />
      </figure>

      <div className="ChocobeRecorder-record">
        {
          Object.values(itemTypes).map(type => (
            <ChocobeRecordCategory
              type={type}
              alt={`${type} 기록`}
              key={type}
            >
              00:00:00
            </ChocobeRecordCategory>
          ))
        }
      </div>
    </div>
  );
};

export default React.memo(ChocobeRecorder);
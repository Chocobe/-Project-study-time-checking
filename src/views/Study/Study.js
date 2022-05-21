import React, {
  useCallback,
} from "react";

import { itemTypes } from "@/components/RecorderItem/model";
import ChocobeRecorderItem from "@/components/RecorderItem/ChocobeRecorderItem";

import camMockImg from "@/assets/imgs/camMockImg.png";

import "./Study.scss";

const Study = () => {
  const addSubject = useCallback(() => {
    console.log("addSubject() 호출");
  }, []);
  
  return (
    <div className="Study">
      <div className="Study-inner">
        <figure className="Study-inner-camWrapper">
          <img
            className="Study-inner-camWrapper-cam"
            src={camMockImg}
            alt="캠 이미지"
          />
        </figure>

        <div className="Study-inner-record">
          {
            Object.values(itemTypes).map(type => (
              <ChocobeRecorderItem
                type={type}
                alt={`${type} 기록`}
                key={type}
              >
                00:00:00
              </ChocobeRecorderItem>
            ))
          }
        </div>
      </div>

      <div className="Study-actions">
        <button
          className="Study-actions-add"
          onClick={addSubject}
        />
      </div>
    </div>
  );
};

export default React.memo(Study);
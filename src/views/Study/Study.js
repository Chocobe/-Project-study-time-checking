import React, {
  useCallback,
  useState,
  useEffect,
} from "react";

import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";
import ChocobeRecorderItem from "@/components/RecorderItem/ChocobeRecorderItem";

import camMockImg from "@/assets/imgs/camMockImg.png";

import "./Study.scss";

const Study = () => {
  const addSubject = useCallback(() => {
    console.log("addSubject() 호출");
  }, []);

  const onUpdate = ({ label, value }) => {
    console.log(`onUpdate({ label, value }) - ${label}, ${value}`);
  };

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
  }, []);
  // FIXME: Mocking
  
  return (
    <div className="Study">
      <div className="Study-inner">
        <figure className="Study-inner-camWrapper">
          <img
            className="Study-inner-camWrapper-cam"
            src={mockSrc}
            alt="캠 이미지"
          />
        </figure>

        <div className="Study-inner-record">
          {
            Object.values(itemTypes).map(type => (
              <ChocobeRecorderCategory
                type={type}
                alt={`${type} 기록`}
                key={type}
              >
                00:00:00
              </ChocobeRecorderCategory>
            ))
          }
        </div>
      </div>

      <div className="Study-items">
        <ChocobeRecorderItem
          value="00:10:23"
          isPlay={false}
          onUpdate={onUpdate}
        >
          알고리즘
        </ChocobeRecorderItem>
        <ChocobeRecorderItem
          value="00:10:23"
          isPlay={true}
          onUpdate={onUpdate}
        >
          알고리즘
        </ChocobeRecorderItem>
        <ChocobeRecorderItem
          value="00:10:23"
          isPlay={false}
          onUpdate={onUpdate}
        >
          알고리즘
        </ChocobeRecorderItem>
        <ChocobeRecorderItem
          value="00:10:23"
          isPlay={false}
          onUpdate={onUpdate}
        >
          알고리즘
        </ChocobeRecorderItem>
        <ChocobeRecorderItem
          value="00:10:23"
          isPlay={false}
          onUpdate={onUpdate}
        >
          알고리즘
        </ChocobeRecorderItem>
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
import React, {
  // useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import ChocobeLabeledImage from "@/components/LabeledImage/ChocobeLabeledImage";

import "./Study.scss";

// import {
//   MainStateContext,
// } from "@/context/MainContext";

const Study = () => {
  // const state = useContext(MainStateContext);

  const [mockSrc, setMockSrc] = useState();

  const initMockCam = useCallback(async () => {
    const { default: img } = await import("@/assets/imgs/cam-test-img.png");
    setMockSrc(img);
  }, []);

  useEffect(() => {
    initMockCam();
  }, [])
  
  return (
    <div className="Study">
      <figure className="Study-camWrapper">
        <img
          className="Study-camWrapper-cam"
          src={mockSrc}
          alt="캠 이미지"
        />
      </figure>

      <div className="Study-record">
        <ChocobeLabeledImage
          fileName="study-removebg-preview.png"
          alt="스터디 기록"
          bgColor="#94D983"
        >
          00:10:10
        </ChocobeLabeledImage>

        <ChocobeLabeledImage
          fileName="phone-removebg-preview.png"
          alt="폰 사용 기록"
          bgColor="#E7E997"
        >
          00: 02:30
        </ChocobeLabeledImage>
        
        <ChocobeLabeledImage
          fileName="empty-removebg-preview.png"
          alt="자리비움 기록"
          bgColor="#FFA8A8"
        >
          00:03:43
        </ChocobeLabeledImage>
      </div>
    </div>
  );
};

export default React.memo(Study);
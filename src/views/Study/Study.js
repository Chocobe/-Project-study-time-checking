import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
} from "react";

import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";
import ChocobeRecorderItem from "@/components/RecorderItem/ChocobeRecorderItem";
import ChocobeModal from "@/components/Modal/ChocobeModal";

import "./Study.scss";

const modalReducer = (prevState, actions) => {
  const {
    type,
    onOk,
    onCancel,
  } = actions;

  switch (type) {
    case "ADD": {
      console.log("reducer - ADD() 호출");

      return {
        isOpen: true,
        title: "Subject 등록",
        okText: "등록",
        cancelText: "취소",
        okBgColor: "#03a9f4",
        onOk,
        onCancel,
      };
    }

    case "EDIT": {
      console.log("reducer - EDIT() 호출");
      
      return {
        isOpen: true,
        title: "Subject 수정",
        okText: "수정",
        cancelText: "취소",
        okBgColor: "#03a9f4",
        onOk,
        onCancel,
      }
    }

    case "DELETE": {
      console.log("reducer - DELETE() 호출");

      return {
        isOpen: true,
        title: "Subject 삭제",
        description: 
          <>
            알고리즘 항목을 삭제 하시겠습니까? <br />
            삭제 시, 복구할 수 없습니다.
          </>,
        okText: "삭제",
        cancelText: "취소",
        okBgColor: "#ff1493",
        onOk,
        onCancel,
      };
    }

    case "CANCEL": {
      const resultState = Object.keys(prevState).reduce((state, key) => ({
        ...state,
        [key]: undefined,
      }), {});

      resultState.isOpen = false;

      return resultState;
    }

    default: {
      console.log(`제공되지 않는 ${type} 입니다.`);
    }
  }
}

const Study = () => {
  const [modalState, dispatchModal] = useReducer(modalReducer);
  
  const onCancel = useCallback(() => {
    dispatchModal({ type: "CANCEL" });
  }, []);
  
  const addSubject = useCallback(() => {
    dispatchModal({
      type: "ADD",
      onCancel,
    });
  }, []);

  const editSubject = useCallback(() => {
    dispatchModal({
      type: "EDIT",
      onCancel,
    });
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
          onClickRoot={editSubject}
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

      <ChocobeModal {...modalState} />
    </div>
  );
};

export default React.memo(Study);
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

import modalReducer from "./modalReducer";

import { mockRecordItems } from "./mockRecordItems";

import "./Study.scss";

const Study = () => {
  const [modalState, dispatchModal] = useReducer(modalReducer);
  
  const closeModal = useCallback(() => {
    dispatchModal({ type: "CANCEL" });
  }, []);
  
  const openAddModal = useCallback(({ value }) => {
    dispatchModal({
      type: "ADD",
      value,
      // onCancel,
      // onOk: ({ id, value }) => {
      //   console.log(`onOk() 결과 - id: ${id}, value: ${value}`);
      // },
    });
  }, []);

  const openEditModal = useCallback(({ id, label }) => {
    dispatchModal({
      type: "EDIT",
      id,
      label,
    });
  }, []);

  // FIXME: API 연결하기
  const onUpdate = useCallback(({ id, value: label }) => {
    // TODO: id ? "FETCH 요청" : "POST 요청";
    id
      ? console.log(`[${id} - ${label}] 수정`)
      : console.log(`[${label}] 등록`);

    const targetItem = mockRecordItems.find(item => item.id === id)
    if (targetItem) {
      targetItem.label = label;
    } else {
      // FIXME:  테스트 용 isPlay: true
      mockRecordItems.push({
        id: mockRecordItems.length,
        label,
        value: "00:00:00",
        isPlay: true,
      });
    }
  }, []);

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
        {
          mockRecordItems.map(item => (
            <ChocobeRecorderItem
              {...item}
              key={item.id}
              onClickRoot={openEditModal}
            >
              {item.label}
            </ChocobeRecorderItem>
          ))
        }
      </div>

      
      <div className="Study-actions">
        <button
          className="Study-actions-add"
          onClick={openAddModal}
        />
      </div>

      <ChocobeModal 
        {...modalState} 
        value={modalState?.label}
        onCancel={closeModal}
        onOk={onUpdate}
      />
    </div>
  );
};

export default React.memo(Study);
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { itemTypes } from "@/components/RecorderCategory/model";
import ChocobeRecorderCategory from "@/components/RecorderCategory/ChocobeRecorderCategory";
import ChocobeRecorderItem from "@/components/RecorderItem/ChocobeRecorderItem";
import ChocobeModal from "@/components/Modal/ChocobeModal";

import modalReducer from "./modalReducer";

import { dispatchSubject } from "./dispatchSubject";

import "./Study.scss";

const Study = () => {
  const [modalState, dispatchModal] = useReducer(modalReducer);

  const [subjects, setSubjects] = useState([]);
  const subjectsRef = useRef();
  subjectsRef.current = subjects;

  const GET_SUBJECTS = useCallback(async () => {
    await dispatchSubject.GET_SUBJECTS(setSubjects);
  }, [setSubjects]);

  const POST_SUBJECT = useCallback(async ({ subjectName }) => {
    await dispatchSubject.POST_SUBJECT({ subjectName });
    await GET_SUBJECTS();
  }, [GET_SUBJECTS]);

  const PUT_SUBJECT = useCallback(async ({
    subjectId, subjectName,
  }) => {
    const targetSubject = subjectsRef.current
      .find(item => item.subjectId === subjectId);

    if (!targetSubject) {
      console.warn(`[subjectId: ${subjectId}] 에 해당하는 데이터를 찾지 못하였습니다.`);
      return;
    }
    
    await dispatchSubject.PUT_SUBJECT({
      subjectId,
      subjectName,
      timeRecord: targetSubject.timeRecord,
    });

    await GET_SUBJECTS();
  }, [subjectsRef, GET_SUBJECTS]);
  
  const closeModal = useCallback(() => {
    dispatchModal({ type: "CANCEL" });
  }, []);
  
  const openAddModal = useCallback(() => {
    dispatchModal({
      type: "ADD",
    });
  }, []);

  const openEditModal = useCallback(({ id, children }) => {
    console.log(`openEditModal() 에서 받은 id: ${id} 😱😱😱`);
    
    dispatchModal({
      type: "EDIT",
      id,
      label: children,
    });
  }, []);

  const onSubmit = useCallback(async ({ id, value }) => {
    console.log("onSubmit() 호출");
    console.log([id, value]);
    console.log(subjectsRef.current)
    
    // TODO: id ? "FETCH 요청" : "POST 요청";
    const response = id
      ? await PUT_SUBJECT({ subjectId: id, subjectName: value })
      : await POST_SUBJECT({ subjectName: value });

    console.log("Study - onSubmit() 결과");
    console.log(response);
  }, [PUT_SUBJECT, POST_SUBJECT]);

  useEffect(() => {
    GET_SUBJECTS();
  }, [GET_SUBJECTS]);

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
          subjects.map(item => (
            <ChocobeRecorderItem
              id={item.subjectId}
              value={item.timeRecord.studyTime}
              key={item.subjectId}
              onClickRoot={openEditModal}
            >
              {item.subjectName}
            </ChocobeRecorderItem>
          ))
        }

        {/* {
          mockRecordItems.map(item => (
            <ChocobeRecorderItem
              {...item}
              key={item.id}
              onClickRoot={openEditModal}
            >
              {item.label}
            </ChocobeRecorderItem>
          ))
        } */}
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
        onOk={onSubmit}
      />
    </div>
  );
};

export default React.memo(Study);
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { MainDispatchContext } from "@/context/MainContext";
import { DISPATCH_TYPE } from "@/context/mainReducer";

import { itemTypes } from "@/components/RecordCategory/model";
import ChocobeRecorderCategory from "@/components/RecordCategory/ChocobeRecordCategory";
import ChocobeRecordItem from "@/components/RecordItem/ChocobeRecordItem";
import ChocobeModal from "@/components/Modal/ChocobeModal";

import modalReducer from "./modalReducer";

import { dispatchSubject } from "./dispatchSubject";

import "./Study.scss";

const Study = () => {
  const [modalState, dispatchModal] = useReducer(modalReducer);
  const [subjects, setSubjects] = useState([]);
  const subjectsRef = useRef();
  subjectsRef.current = subjects;

  const dispatchContext = useContext(MainDispatchContext);
  const navigator = useNavigate();

  const GET_SUBJECTS = useCallback(async () => {
    const isSuccess = await dispatchSubject.GET(setSubjects);

    if (isSuccess) return;

    dispatchContext({ type: DISPATCH_TYPE.LOGOUT });
    navigator("/");
  }, [setSubjects, dispatchContext, navigator]);

  const POST_SUBJECT = useCallback(async ({ subjectName }) => {
    await dispatchSubject.POST({ subjectName });
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
    
    await dispatchSubject.PUT({
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
    dispatchModal({
      type: "EDIT",
      id,
      value: children,
    });
  }, []);

  const onSubmit = useCallback(async ({ id, value }) => {
    id
      ? await PUT_SUBJECT({ subjectId: id, subjectName: value })
      : await POST_SUBJECT({ subjectName: value });
  }, [PUT_SUBJECT, POST_SUBJECT]);

  const onDelete = useCallback(async ({ id }) => {
    await dispatchSubject.DELETE({ subjectId: id });
    await GET_SUBJECTS();
  }, [GET_SUBJECTS]);

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
            <ChocobeRecordItem
              id={item.subjectId}
              value={item.timeRecord.studyTime}
              key={item.subjectId}
              onClickRoot={openEditModal}
            >
              {item.subjectName}
            </ChocobeRecordItem>
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
        onOk={onSubmit}
        onCancel={closeModal}
        onDelete={onDelete}
      />
    </div>
  );
};

export default React.memo(Study);
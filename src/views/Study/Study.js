import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { MainDispatchContext } from "@/context/MainContext/MainContext";
import { DISPATCH_TYPE } from "@/context/MainContext/mainReducer";
import { RecorderStateContext } from "@/context/RecorderContext/RecorderContext";

import ChocobeRecorder from "@/components/Recorder/ChocobeRecorder";
import ChocobeRecordItem from "@/components/RecordItem/ChocobeRecordItem";
import ChocobeModal from "@/components/Modal/ChocobeModal";

import modalReducer from "./modalReducer";

import { dispatchSubject } from "./dispatchSubject";

import "./Study.scss";

const Study = () => {
  const dispatchContext = useContext(MainDispatchContext);
  const recorderState = useContext(RecorderStateContext);

  const navigator = useNavigate();

  const [modalState, dispatchModal] = useReducer(modalReducer);
  const [subjects, setSubjects] = useState([]);
  const subjectsRef = useRef();
  subjectsRef.current = subjects;

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

  const openEditModal = useCallback(item => {
    const { subjectId, subjectName } = item;
    
    dispatchModal({
      type: "EDIT",
      id: subjectId,
      value: subjectName,
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
  
  return (
    <div className="Study">
      <ChocobeRecorder />

      <div className="Study-items">
        {
          subjects.map(item => (
            <ChocobeRecordItem
              item={item}
              isPlay={recorderState?.subjectId === item.subjectId}
              key={item.subjectId}
              onClick={openEditModal}
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
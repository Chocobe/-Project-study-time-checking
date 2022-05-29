import React, {
  useContext,
  useMemo,
  useCallback,
} from "react";

import {
  RecorderDispatchContext,
} from "@/context/RecorderContext/RecorderContext";
import { DISPATCH_TYPE } from "@/context/RecorderContext/recorderReducer";

import "./ChocobeRecordItem.scss";

const ChocobeRecordItem = ({
  item, isPlay,
  onClick, children,
}) => {
  const dispatch = useContext(RecorderDispatchContext);

  // const [study, setStudy] = useState();
  // const [phone, setPhone] = useState();
  // const [empty, setEmpty] = useState();

  // const studyRef = useRef();
  // const phoneRef = useRef();
  // const emptyRef = useRef();

  // studyRef.current = study;
  // phoneRef.current = phone;
  // emptyRef.current = empty;

  const rootClassName = useMemo(() => {
    const buttonRootClass = "ChocobeRecorderItem";

    return isPlay
      ? `${buttonRootClass} ${buttonRootClass}__play`
      : buttonRootClass;
  }, [isPlay]);

  const onClickItem = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  const onClickController = useCallback(e => {
    e.stopPropagation();

    if (!isPlay) {
      dispatch({ type: DISPATCH_TYPE.START, item });
    } else {
      dispatch({ type: DISPATCH_TYPE.PAUSE });
    }
  }, [item, isPlay, dispatch]);
  
  return (
    <div 
      className={rootClassName}
      onClick={onClickItem}
    >
      <div className="ChocobeRecorderItem-controller">
        <button 
          className="ChocobeRecorderItem-controller-button"
          onClick={onClickController}
        >
          <span className="ChocobeRecorderItem-controller-button-icon">
            <span className="ChocobeRecorderItem-controller-button-icon-pause" />
            <span className="ChocobeRecorderItem-controller-button-icon-play" />
          </span>
        </button>
      </div>

      <div className="ChocobeRecorderItem-content">
        <div className="ChocobeRecorderItem-content-label">
          {children}
        </div>

        <div className="ChocobeRecorderItem-content-value">
          {item.studyTime}
        </div>
      </div>
    </div>
  )
};

export default React.memo(ChocobeRecordItem);
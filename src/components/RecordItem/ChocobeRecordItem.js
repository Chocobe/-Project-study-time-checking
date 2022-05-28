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

  const studyTime = useMemo(() => item.timeRecord?.studyTime, [item]);

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
    // FIXME: Play || Pause 동작 추가하기
    console.log(item);

    const type = isPlay
      ? DISPATCH_TYPE.PAUSE
      : DISPATCH_TYPE.START;

    dispatch({ type, item });
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
          {/* {value} */}
          {studyTime}
        </div>
      </div>
    </div>
  )
};

export default React.memo(ChocobeRecordItem);
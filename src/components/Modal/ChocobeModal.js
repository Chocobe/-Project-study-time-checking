import React, {
  useState,
  useCallback,
  useEffect,
} from "react";

import ChocobeButton from "@/components/Button/ChocobeButton";

import { fromEvent, merge } from "rxjs";
import { filter } from "rxjs/operators";

import "./ChocobeModal.scss";

const ChocobeModal = ({
  isOpen, title, description,
  okText, cancelText,
  okBgColor, cancelBgColor,
  onOk, onCancel,
}) => {
  const [backdropSubscription, setBackdropSubscription] = useState();
  
  const renderOkButton = useCallback(() => {
    if (!okText) return;

    return (
      <ChocobeButton
        className="ChocobeModal-modal-actions-ok"
        onClick={onOk}
        fluid
        bgColor={okBgColor}
      >
        {okText}
      </ChocobeButton>
    )
  }, [okText, onOk, okBgColor]);

  const renderCancelButton = useCallback(() => {
    if (!cancelText) return;

    return (
      <ChocobeButton
        className="ChocobeModal-modal-actions-cancel"
        onClick={onCancel}
        fluid
        bgColor={cancelBgColor}
      >
        {cancelText}
      </ChocobeButton>
    )
  }, [cancelText, onCancel, cancelBgColor]);

  const renderActions = useCallback(() => {
    const okButton = renderOkButton();
    const cancelButton = renderCancelButton();

    if (!okButton && !cancelButton) return;

    return (
      <div className="ChocobeModal-modal-actions">
        {okButton}
        {cancelButton}
      </div>
    );
  }, [renderOkButton, renderCancelButton]);

  const unsubscribeBackdrop = useCallback(() => {
    backdropSubscription?.unsubscribe();
  }, []);

  const subscribeBackdrop = useCallback(() => {
    unsubscribeBackdrop();
    
    const subscription = merge(
      fromEvent(window, "click").pipe(
        filter(({ target }) => target.classList.contains("ChocobeModal"))
      ),
      fromEvent(window, 'keydown').pipe(
        filter(({ key }) => key.toLowerCase() === 'escape')
      ),
    ).subscribe(onCancel);

    setBackdropSubscription(subscription);
  }, [onCancel, unsubscribeBackdrop]);

  useEffect(() => {
    isOpen
      ? subscribeBackdrop()
      : unsubscribeBackdrop();
  }, [isOpen, subscribeBackdrop, unsubscribeBackdrop]);

  if (!isOpen) return;

  return (
    <div className="ChocobeModal">
      <div className="ChocobeModal-modal">
        <h3 className="ChocobeModal-modal-title">
          {title}
        </h3>

        {
          description
            ? <p className="ChocobeModal-modal-description">{description}</p>
            : <></>
        }

        <input
          className="ChocobeModal-modal-input"
        />

        {renderActions()}
      </div>
    </div>
  )
};

export default React.memo(ChocobeModal);
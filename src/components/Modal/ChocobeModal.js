import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import ChocobeButton from "@/components/Button/ChocobeButton";
import ChocobeInput from "@/components/Input/ChocobeInput";

import { fromEvent, merge } from "rxjs";
import { filter, tap } from "rxjs/operators";

import "./ChocobeModal.scss";

const ChocobeModal = ({
  isOpen, id, title, description, value = "",
  okText, cancelText,
  okBgColor, cancelBgColor, deleteBgColor,
  onOk, onCancel, onDelete,
}) => {
  const [curValue, setCurValue] = useState(value);
  const curValueRef = useRef();
  const $input = useRef();
  
  curValueRef.current = curValue;

  const backdropSubscription = useRef();

  const onInput = useCallback(({ target: { value } }) => {
    setCurValue(value);
  }, []);

  const onClickOk = useCallback(() => {
    onOk?.({ id, value: curValueRef.current });
    onCancel?.();
  }, [id, curValueRef, onOk, onCancel]);

  const onClickDelete = useCallback(() => {
    onDelete?.({ id });
    onCancel?.();
  }, [id, onDelete, onCancel]);

  const init = useCallback(() => {
    setCurValue(value);
  }, [value]);

  const renderDeleteButton = useCallback(() => {
    if (!id) return;

    return (
      <ChocobeButton
        className="ChocobeModal-modal-header-delete"
        onClick={onClickDelete}
        fluid={false}
        bgColor={deleteBgColor}
      >
        삭제
      </ChocobeButton>
    );
  }, [id, deleteBgColor, onClickDelete]);

  const renderOkButton = useCallback(() => {
    if (!okText) return;

    return (
      <ChocobeButton
        className="ChocobeModal-modal-actions-ok"
        onClick={onClickOk}
        fluid
        bgColor={okBgColor}
      >
        {okText}
      </ChocobeButton>
    )
  }, [okText, okBgColor, onClickOk]);

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
    backdropSubscription.current?.unsubscribe();
    backdropSubscription.current = undefined;
  }, []);

  const subscribeBackdrop = useCallback(() => {
    unsubscribeBackdrop();
    
    const subscription = merge(
      fromEvent(window, "click").pipe(
        filter(({ target }) => target.classList.contains("ChocobeModal"))
      ),
      fromEvent(window, "keydown").pipe(
        filter(({ key }) => key.toLowerCase() === 'escape')
      ),
      fromEvent(window, "keydown").pipe(
        filter(({ key }) => key.toLowerCase() === 'enter'),
        tap(onClickOk)
      )
    ).subscribe(onCancel);

    backdropSubscription.current = subscription;
  }, [onClickOk, onCancel, unsubscribeBackdrop]);

  useEffect(() => {
    init();

    if (isOpen) {
      $input.current?.focus();
      subscribeBackdrop();
    } else {
      unsubscribeBackdrop();
    }
  }, [isOpen, subscribeBackdrop, unsubscribeBackdrop, init]);

  if (!isOpen) return;

  return (
    <div className="ChocobeModal">
      <div className="ChocobeModal-modal">
        <header className="ChocobeModal-modal-header">
          <h3 className="ChocobeModal-modal-header-title">
            {title}
          </h3>

          {renderDeleteButton()}
        </header>

        {
          description
            ? <p className="ChocobeModal-modal-description">{description}</p>
            : undefined
        }

        <ChocobeInput
          ref={$input}
          className="ChocobeModal-modal-input"
          value={curValueRef.current}
          onInput={onInput}
          placeholder="과목명을 입력해 주세요"
          fluid
        />

        {renderActions()}
      </div>
    </div>
  )
};

export default React.memo(ChocobeModal);
import React, {
  useMemo,
} from "react";

import "./ChocobeInput.scss";

const ChocobeInput = React.forwardRef(({
  value, placeholder, onInput, 
  fluid, className = "",
}, ref) => {
  const rootClassName = useMemo(() => {
    return [
      "ChocobeInput",
      fluid ? "ChocobeInput__fluid" : "",
      ...className.split(" "),
    ].filter(k => k).join(" ");
  }, [fluid, className]);

  return (
    <input
      ref={ref}
      className={rootClassName}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
    />
  )
});

export default React.memo(ChocobeInput);
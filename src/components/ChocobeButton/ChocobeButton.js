import React, {
  useMemo,
} from "react";

import "./ChocobeButton.scss";

const ChocobeButton = ({
  className, fluid, children, onClick,
}) => {
  const parsedClassName = useMemo(() => {
    const names = Object.entries({
      ChocobeButton: true,
      "ChocobeButton__fluid": fluid,
      [className]: true,
    })
      .filter(([_, v]) => v)
      .map(([key]) => key)
      .join(" ");
    
    return names;
  }, [className, fluid]);

  return (
    <button
      className={parsedClassName}
      onClick={onClick}
    >
      {children}
    </button>
  )
};

ChocobeButton.defaultProps = {
  fluid: false,
  children: "초코비 버튼",
  className: "no-root-class hello-world",
}

export default React.memo(ChocobeButton);
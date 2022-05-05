import React, {
  //
} from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="mainLayout">
      <h1 className="mainLayout-title">
        It's Main Layout Component
      </h1>

      {children}
    </div>
  );
};

export default MainLayout;
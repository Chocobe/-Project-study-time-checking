import React, {
  useReducer,
} from "react";

import { recorderReducer } from "./recorderReducer";

export const RecorderStateContext = React.createContext({
  subjectId: undefined,
  subjectName: undefined,
  timeRecord: {
    studyTime: undefined,
    phoneTime: undefined,
    emptyTime: undefined,
  },
});
export const RecorderDispatchContext = React.createContext();

const RecorderContext = ({ children }) => {
  const [state, dispatch] = useReducer(recorderReducer);

  return (
    <RecorderStateContext.Provider value={state}>
      <RecorderDispatchContext.Provider value={dispatch}>
        {children}
      </RecorderDispatchContext.Provider>
    </RecorderStateContext.Provider>
  )
};

export default React.memo(RecorderContext);
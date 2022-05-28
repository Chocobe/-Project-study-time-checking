export const DISPATCH_TYPE = {
  START: "start",
  PAUSE: "pause",
};

export const recorderReducer = (prevState, action) => {
  const { type, item } = action;

  console.log("recorderReducer() 호출");
  console.log(`type: ${type}`);
  console.log(item);
  
  switch (type) {
    case DISPATCH_TYPE.START: {
      console.log("recorderReducer - START()");

      return { ...item };
    }

    case DISPATCH_TYPE.PAUSE: {
      console.log("recorderReducer - PAUSE()");
      
      return Object.keys(prevState).reduce((state, key) => ({
        ...state,
        [key]: undefined,
      }), {});
    }

    default: {
      throw new Error(`[recorderContext] - "${type}" 은(는) 사용할 수 없는 type 입니다.`);
    }
  }
};

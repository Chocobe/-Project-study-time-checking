export const DISPATCH_TYPE = {
  START: "start",
  RECORDING: "recording",
  PAUSE: "pause",
};

export const recorderReducer = (prevState, action) => {
  const { type, item, updateType } = action;

  switch (type) {
    case DISPATCH_TYPE.START: {
      return { 
        ...item,
        recording: {
          start: new Date(),
          study: 0,
          phone: 0,
          empty: 0,
        },
      };
    }

    case DISPATCH_TYPE.RECORDING: {
      if (!prevState) return;

      const recording = { ...prevState.recording };
      recording[updateType]++;
      
      return {
        ...prevState,
        recording,
      };
    }

    case DISPATCH_TYPE.PAUSE: {
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

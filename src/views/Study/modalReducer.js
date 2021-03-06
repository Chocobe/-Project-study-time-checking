const modalReducer = (prevState, actions) => {
  const {
    type,
    id,
    value,
  } = actions;

  switch (type) {
    case "ADD": {
      return {
        isOpen: true,
        title: "Subject 등록",
        okText: "등록",
        cancelText: "취소",
        okBgColor: "#03a9f4",
      };
    }

    case "EDIT": {
      return {
        isOpen: true,
        title: "Subject 수정",
        okText: "수정",
        cancelText: "취소",
        okBgColor: "#03a9f4",
        deleteBgColor: "#ff1493",

        id,
        value,
      }
    }

    case "DELETE": {
      return {
        isOpen: true,
        title: "Subject 삭제",
        description: 
          <>
            알고리즘 항목을 삭제 하시겠습니까? <br />
            삭제 시, 복구할 수 없습니다.
          </>,
        okText: "삭제",
        cancelText: "취소",
        okBgColor: "#ff1493",

        id,
        value,
      };
    }

    case "CANCEL": {
      const resultState = {
        isOpen: false,
      }

      return resultState;
    }

    default: {
      console.warn(`제공되지 않는 ${type} 입니다.`);
    }
  }
}

export default modalReducer;
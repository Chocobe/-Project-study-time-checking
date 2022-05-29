export const ITEM_TYPE = {
  STUDY: "study",
  PHONE: "phone",
  EMPTY: "empty",
};

export const recorderCategoryModel = [
  {
    type: ITEM_TYPE.STUDY,
    fileName: "study-removebg-preview.png",
    alt: "스터디 이미지",
    bgColor: "#94D983",
    label: "열심히 공부중 입니다.",
  },
  {
    type: ITEM_TYPE.PHONE,
    fileName: "phone-removebg-preview.png",
    alt: "폴 사용 이미지",
    bgColor: "#E7E997",
    label: (
      <>
        딴짓중 입니다. <br />
        공부시간에서 제외 됩니다.
      </>
    ),
  },
  {
    type: ITEM_TYPE.EMPTY,
    fileName: "empty-removebg-preview.png",
    alt: "자리비움 이미지",
    bgColor: "#FFA8A8",
    label: (
      <>
        자리비움 상태 입니다. <br />
        공부시간에서 제외 됩니다.
      </>
    ),
  },
];
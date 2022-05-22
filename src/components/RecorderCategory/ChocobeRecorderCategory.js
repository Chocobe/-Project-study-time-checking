import React, {
  useMemo,
} from "react";

import {
  recorderCategoryModel,
} from "./model";

import ChocobeLabeledImage from "@/components/LabeledImage/ChocobeLabeledImage";

const ChocobeRecorderItem = ({
  type, alt, children
}) => {
  const item = useMemo(() => {
    return recorderCategoryModel.find(i => i.type === type)
  }, [type]);

  const props = useMemo(() => ({
    fileName: item.fileName,
    alt: alt ? alt : item.alt,
    bgColor: item.bgColor,
  }), [item, alt]);

  if (!props) return <></>;

  return (
    <ChocobeLabeledImage {...props}>
      {children ? children : item.label}
    </ChocobeLabeledImage>
  );
};

export default React.memo(ChocobeRecorderItem);
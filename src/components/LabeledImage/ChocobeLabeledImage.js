import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import "./ChocobeLabeledImage.scss";

const ChocobeLabeledImage = ({
  fileName,
  alt,
  size = 60,
  bgColor,
  children,
}) => {
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const imgStyle = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgColor,
  }), [bgColor]);

  const initImg = useCallback(async () => {
    const { default: imgFile } = await import(`@/assets/imgs/${fileName}`);

    setImg(imgFile);
    setIsLoading(false);
  }, [fileName]);

  useEffect(() => {
    initImg();
  }, [initImg]);

  return (
    <figure className="ChocobeLabeledImage">
      {
        isLoading 
          ? <></>
          : <img className="ChocobeLabeledImage-img" src={img} alt={alt} style={imgStyle} />
      }

      <figcaption className="ChocobeLabeledImage-caption">
        {children}
      </figcaption>
    </figure>
  );
};

export default React.memo(ChocobeLabeledImage);
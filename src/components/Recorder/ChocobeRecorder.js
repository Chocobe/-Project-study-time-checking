import React, {
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { buffer, interval } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import {
  RecorderStateContext,
  RecorderDispatchContext,
} from "@/context/RecorderContext/RecorderContext";

import ChocobeRecordCategory from "@/components/RecordCategory/ChocobeRecordCategory";
import { PREDICT_KEYS } from "./types";

import "./ChocobeRecorder.scss";
import { DISPATCH_TYPE } from "@/context/RecorderContext/recorderReducer";

const MODEL_BASE_URL = "https://teachablemachine.withgoogle.com/models/NV06XYL6k";
const REF_URL = {
  MODEL: `${MODEL_BASE_URL}/model.json`,
  METADATA: `${MODEL_BASE_URL}/metadata.json`,
};

const ChocobeRecorder = () => {
  const state = useContext(RecorderStateContext);
  const dispatch = useContext(RecorderDispatchContext);

  const recording = useMemo(() => state?.recording, [state]);
  
  const studyTime = useMemo(() => {
    const studyTime = recording?.studyTime ?? "00:00:00";
    const [hh, mm, ss] = studyTime.split(":");

    // FIXME: 가공

    return `${hh}:${mm}:${ss}`;
  }, [recording]);

  const tmImage = useMemo(() => window?.tmImage, []);
  const webcam = useRef();
  const model = useRef();
  const numOfPrediction = useRef();
  const $camWrapper = useRef();
  const calcSubscription = useRef();

  const loopAnimationFrame = useCallback(async () => {
    webcam.current?.update();
    requestAnimationFrame(loopAnimationFrame);
  }, [webcam]);

  const initWebcamCanvas = useCallback(() => {
    const canvas = webcam.current?.canvas;
    canvas.classList.add("ChocobeRecorder-camWrapper-cam");

    $camWrapper.current.replaceChildren(webcam.current.canvas);
  }, [$camWrapper]);

  const initModel = useCallback(async () => {
    model.current = await tmImage.load(REF_URL.MODEL, REF_URL.METADATA);
    numOfPrediction.current = model.current?.getTotalClasses();
  }, [tmImage]);

  const initWebcam = useCallback(async () => {
    webcam.current = new tmImage.Webcam(200, 200, true);
    
    if (!webcam.current) return;

    await webcam.current.setup();
    await webcam.current.play();

    requestAnimationFrame(loopAnimationFrame);
  }, [tmImage, webcam, loopAnimationFrame]);

  const subscribeCalc = useCallback(() => {
    console.log(PREDICT_KEYS);
    
    calcSubscription.current = interval(100).pipe(
      mergeMap(async () => await model.current?.predict(webcam.current?.canvas)),
      buffer(interval(1000)),
      map(originData => {
        return originData.reduce((total, data) => {
          total.push(data.reduce((t, d) => {
            const key = d[PREDICT_KEYS.KEY];
            const value = d[PREDICT_KEYS.VALUE];
            t[key] = (t[key] ?? 0) + value;
            return t;
          }, {}));

          return total;
        }, []);
      }),
      map(originData => {
        return originData.reduce((total, data) => {
          Object.entries(data).forEach(([key, value]) => {
            total[key] = (total[key] ?? 0) + Number(value.toFixed(2));
          });

          return total;
        }, {});
      }),
      map(originData => {
        return Object.entries(originData).reduce((t, [key, value]) => {
          const prevValue = Object.values(t)?.[0] ?? -1;

          return value >= prevValue
            ? { [key]: value }
            : t;
        }, {});
      }),
      map(result => Object.keys(result)?.[0] ?? "")
    ).subscribe(updateType => {
      // FIXME: onUpdate() 호출하기 - props 로 받기
      
      dispatch({ type: DISPATCH_TYPE.RECORDING, updateType });
    });
  }, [model, webcam, dispatch]);
  
  const initialize = useCallback(async () => {
    await initModel();
    await initWebcam();
    initWebcamCanvas();
    subscribeCalc();
  }, [initModel, initWebcam, initWebcamCanvas, subscribeCalc]);

  useEffect(() => {
    initialize()
  }, [initialize]);
  
  const [mockSrc, setMockSrc] = useState();
  const initMockSrc = useCallback(async () => {
    const { default: loadedImg } = await import("@/assets/imgs/camMockImg.png");
    setMockSrc(loadedImg);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      initMockSrc();
    });
  }, [initMockSrc]);

  return (
    <div className="ChocobeRecorder">
      <figure 
        className="ChocobeRecorder-camWrapper"
        ref={$camWrapper}
      >
        <img
          className="ChocobeRecorder-camWrapper-cam"
          src={mockSrc}
          alt="캠 영상"
        />
      </figure>

      <div className="ChocobeRecorder-record">
        {/* {
          Object.values(ITEM_TYPE).map(type => (
            <ChocobeRecordCategory
              type={type}
              alt={`${type} 기록`}
              key={type}
            >
              {[`${type}Time`]}
            </ChocobeRecordCategory>
          ))
        } */}

        {
          <ChocobeRecordCategory
            type="study"
            alt="study 기록"
          >
            {studyTime}
          </ChocobeRecordCategory>
        }
        {
          <ChocobeRecordCategory
            type="study"
            alt="study 기록"
          >
            {studyTime}
          </ChocobeRecordCategory>
        }
        {
          <ChocobeRecordCategory
            type="study"
            alt="study 기록"
          >
            {studyTime}
          </ChocobeRecordCategory>
        }
      </div>
    </div>
  );
};

export default React.memo(ChocobeRecorder);
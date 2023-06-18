import Chat from "components/Chat";
import React, { useEffect, useRef } from "react";
import useRPPG from "hooks/useRPPG";
import useFaceMesh from "hooks/useFaceMesh";

const ChatDoc = () => {
  const videoElement = useRef < HTMLVideoElement > null;
  const canvasElement = useRef < HTMLCanvasElement > null;
  const processingFaceMesh = useRef(false);

  const stopHandler = () => {
    stop();

    // closeCamera();
    // cameraInstance?.stop();
  };

  const onCalculationEndedCb = () => {
    stopHandler();
    closeCamera();
    cameraInstance?.stop();
  };

  const { stop, closeCamera } = useRPPG({
    videoElement,
    // onUnsupportedDeviceCb,
    onAllDataCalculatedCb: onCalculationEndedCb,
    onCalculationEndedCb,
  });

  const { cameraInstance } = useFaceMesh({
    videoElement,
    canvasElement,
    processing: processingFaceMesh,
  });

  useEffect(() => {
    onCalculationEndedCb();
  }, []);

  return (
    <div>
      <Chat />
    </div>
  );
};

export default ChatDoc;

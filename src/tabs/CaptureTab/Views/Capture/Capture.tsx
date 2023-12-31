import { useEffect, useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@fluentui/react-northstar";
import classNames from "classnames";
import useFaceMesh from "hooks/useFaceMesh";
import useRPPG from "hooks/useRPPG";
import useNotification from "hooks/useNotification";
import {
	LoadingScreen,
	CheckFps,
	ImageQuality,
	Notification,
	Info,
	TextMessage,
	ProgressType,
} from "tabs/CaptureTab/Components";
import {
	NOTIFICATION_FACE_ORIENT_WARNING,
	NOTIFICATION_FACE_SIZE_WARNING,
	NOTIFICATION_INTERFERENCE_WARNING,
	NOTIFICATION_NO_FACE_DETECTED,
} from "helpers/notification";
import "./Capture.scss";
import Cookies from "universal-cookie";
import AuthContext from "components/context/AuthContext";
import { toast } from "react-hot-toast";
import Modal from "components/Modal";
import "components/General.scss";
import { API_URL } from "components/config";

export function Capture() {
	const videoElement = useRef<HTMLVideoElement>(null);
	const canvasElement = useRef<HTMLCanvasElement>(null);
	const [isReady, setIsReady] = useState<boolean>(true);
	const [isCancel, setIsCancel] = useState<boolean>(true);
	const [isCancelModal, setIsCancelModal] = useState<boolean>(false);
	const [isDone, setIsDone] = useState<boolean>(false);

	const history = useHistory();

	const cookies = new Cookies();

	const { resultReading, setResultReading, user, canCapture } =
		useContext(AuthContext);

	useEffect(() => {
		if (!user?.updated_profile) {
			history.push("/account/edit");
		}

		if (!user) {
			history.push("/login");
		}

		if (!user?.active_subscription) {
			toast.error("Please subscribe to take a reading!", {
				duration: 6000,
			});

			history.push("/home");

			setTimeout(() => {
				window.location.reload();
			}, 7000);
		}
	}, []);

	const [size, setSize] = useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	});

	const { message, addNotification, clearAllNotifications } = useNotification();

	const processingFaceMesh = useRef(false);

	const [useFrontCamera, setUseFrontCamera] = useState(true);

	const onUnsupportedDeviceCb = () => {
		stopHandler();
		history.push("/capture/not-supported");
	};

	// const handleResult = async () => {

	// };

	const onCalculationEndedCb = async () => {
		stopHandler();
		closeCamera();
		cameraInstance?.stop();

		history.push("/capture/results", {
			rppgData,
			isAllDataCalculated,
		});
	};

	const onFaceDetectionChange = (faceDetected: boolean) => {
		if (processing && !faceDetected) {
			addNotification(NOTIFICATION_NO_FACE_DETECTED);
		}
	};

	const onInterferenceWarningCb = () => {
		// addNotification(NOTIFICATION_INTERFERENCE_WARNING);
		// setTimeout(() => {
		//   stopHandler();
		//   history.push("/capture/bad-conditions");
		// }, 3000);
	};

	const onFaceOrientWarningCb = () =>
		processing && addNotification(NOTIFICATION_FACE_ORIENT_WARNING);

	const onFaceSizeWarningCb = () =>
		processing && addNotification(NOTIFICATION_FACE_SIZE_WARNING);

	// Facemesh init
	const { cameraInstance } = useFaceMesh({
		videoElement,
		canvasElement,
		processing: processingFaceMesh,
		onFaceDetectionChange,
	});

	// Rppg init
	const {
		rppgData,
		ready,
		rppgInstance,
		isAllDataCalculated,
		imageQualityFlags,
		progressType,
		processing,
		checkFps,
		start,
		stop,
		closeCamera,
		// threeValuesCalculated,
	} = useRPPG({
		videoElement,
		// onUnsupportedDeviceCb,
		onAllDataCalculatedCb: onCalculationEndedCb,
		onCalculationEndedCb,
		onInterferenceWarningCb,
		onFaceOrientWarningCb,
		onFaceSizeWarningCb,
	});

	useEffect(() => {
		// if (!canCapture) {
		// stopHandler();
		if (!rppgInstance || !ready) {
			return;
		}
		console.log("useEffect - rppg - initialized");
		// @ts-ignore
		const { width, height } = rppgInstance.rppgCamera;
		setSize({ width, height });
		// }
	}, [ready, rppgInstance]);

	useEffect(() => {
		// if (canCapture) {
		processingFaceMesh.current = processing;
		// }
	}, [processing]);

	const startHandler = () => {
		start();
	};

	// const handleDone = () => {

	// };

	const stopHandler = () => {
		setIsDone(true);
		setIsCancelModal(false);
		clearAllNotifications();
		stop();

		// closeCamera();
		// cameraInstance?.stop();
	};

	const startButtonHandler = () => {
		if (processing) {
			// handleCancel();
			setIsCancelModal(true);
		} else {
			startHandler();
		}
	};

	// const startButtonHandler = () => {
	// 	if (processing) {
	// 		stopHandler();
	// 	} else {
	// 		startHandler();
	// 	}
	// };

	return (
		<div className="measurement-container">
			{/* isAllDataCalculated: {String(isAllDataCalculated)}, 
      fps: {JSON.stringify(fps)}<br/>
      ready: {String(ready)},
      faceDetected: {String(faceDetected)}, */}

			{isReady && (
				<Modal
					text={
						"Ready? Please confirm you are seated and at rest before you start the assessment. We recommend that you are seated and rested 5 mins before taking a reading."
					}
					btn={true}
					btnType={"primary"}
					btnText={"Ready"}
					btnCount={1}
					color={"text-white bg-primary rounded-md px-[2rem] medium"}
					event={() => setIsReady(false)}
					icon=""
					px=""
					header=""
					otherEvent=""
					bg=""
					btnText2=""
					btnType2=""
					bg2=""
					color2=""
					px2=""
				/>
			)}

			{isDone && (
				<Modal
					text={"Please note that assessment will not be saved"}
					btn={true}
					btnType={"primary"}
					btnText={"Done"}
					btnCount={1}
					color={"text-white bg-primary rounded-md px-[2rem] medium"}
					event={() => setIsDone(false)}
					icon=""
					px=""
					header=""
					otherEvent=""
					bg=""
					btnText2=""
					btnType2=""
					bg2=""
					color2=""
					px2=""
				/>
			)}
			{isCancelModal && (
				<Modal
					text={"Are you sure you want to cancel your vital signs reading?"}
					btn={true}
					btnType={"primary"}
					btnText={"Don't Cancel"}
					btnCount={2}
					color={
						"text-white bg-primary px-[1rem] rounded-md medium max-md:mb-[1rem]"
					}
					event={() => setIsCancelModal(false)}
					icon=""
					px=""
					header=""
					otherEvent={() => stopHandler()}
					bg=""
					btnText2="Cancel"
					btnType2="text"
					bg2=""
					color2="text-primary medium"
					px2=""
				/>
			)}

			{!ready && <LoadingScreen />}

			<div className="measurement-wrapper">
				<div className="video-container max-md:h-[20rem]">
					<div className="video-wrapper">
						<video
							ref={videoElement}
							autoPlay
							playsInline
							muted
							className={classNames({
								video: true,
								horizontal: size.width > size.height,
								vertical: size.width <= size.height,
								invert: useFrontCamera,
							})}
						></video>
						<canvas ref={canvasElement} className="canvas"></canvas>
					</div>
				</div>

				{/* {processing && <ImageQuality imageQualityFlags={imageQualityFlags} />} */}
				<div className=" information">
					<div className="start-block-wrapper">
						{message ? (
							<Notification message={message} />
						) : (
							<>
								<TextMessage progressType={progressType} />

								{checkFps && <CheckFps />}
							</>
						)}

						{processing && progressType !== ProgressType.CALIBRATING && (
							<Info rppgData={rppgData} />
						)}
					</div>

					<Button
						primary
						// fluid
						content={processing ? "Cancel reading" : "Start"}
						disabled={!ready}
						loading={!ready}
						onClick={startButtonHandler}
						className=" bg-primary text-white rounded-md py-[0.5rem] px-[1rem] w-[20rem] mt-[15rem]"
					/>
				</div>
			</div>
		</div>
	);
}

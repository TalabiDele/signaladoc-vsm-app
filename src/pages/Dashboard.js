import React, { useEffect, useRef, useContext } from "react";
import Dash from "components/Dash";
import useRPPG from "hooks/useRPPG";
import useFaceMesh from "hooks/useFaceMesh";
import AuthContext from "components/context/AuthContext";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
	const videoElement = useRef(null);
	const canvasElement = useRef(null);
	const processingFaceMesh = useRef(false);

	const { user } = useContext(AuthContext);

	console.log(user);

	const history = useHistory();

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

		if (!user) {
			history.push("/login");
		}
	}, []);

	return (
		<div className=" max-2xl:ml-[10rem] max-md:ml-[0rem] max-lg:ml-[12rem]">
			<Dash />
		</div>
	);
};

export default Dashboard;
